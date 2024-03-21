const orderService = require('../services/order_services')
const orderPorductServices = require('../services/orderProduct_services')
const productService = require('../services/productServices')
const { createOrderDTO, updateOrderDTO } = require('../validators/order_validator')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const cron = require('node-cron');
//const { message } = require('../validators/media_validator')


const index = async (req, res, next) => {
    try {
        const userId = req.user.id
        const data = await orderService.getAll(userId)
        return res.status(200).json({
            message: 'Request Success',
            payload: data
        })
    } catch (error) {
        if (error.message) {
            next({ status: 400, message: error.message, data: {} })
        }
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const userId = req.user.id
        const id = +req.params.id
        const order = await orderService.findById(id)
        if(!order || userId !== order.dataValues.userId) throw new NotFoundError(`order not found`)
        return res.status(200).json({
            message: 'Request Success',
            payload: order
        }
        )

    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        //not using transaction, so product stock will check first
        const orderDTO = await createOrderDTO.validateAsync(req.body)
        //expired time set 60 minutes
        const expiredAt = new Date(Date.now() + (60 * 60 * 1000)).toISOString()
        const productList = req.body.orderProducts

        //check product stock
        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            const productStock = await productService.findById(product.productId)
            if (productStock) {
                availableStock = productStock.stock
                const newStock = availableStock - product.quantity
                if (newStock < 0) throw new BadRequestError('Stock less than your order')
            } else
                throw new NotFoundError("Product not Found")
        }

        //reduce stock, update stock in db product
        let totalPrice = 0

        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            const productId = product.productId
            const productStock = await productService.findById(productId)
            const subTotal = productStock.dataValues.price * product.quantity
            totalPrice += subTotal
            const newStock = productStock.stock - product.quantity
            const payload = { stock: newStock }
            await productService.updateProduct(productId, payload)
        }

        //insert to db order
        const payload = {
            userId: req.user.id,
            paymentMethodId: orderDTO.paymentMethodId,
            totalPrice: totalPrice, // assumption front end calculate total price
            expiredAt: expiredAt,
            status: "payment_waiting",
        }
        const result = await orderService.createOrder(payload);

        //insert to db order product
        const orderId = result.dataValues.id

        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            const getProductDetail = await productService.findById(product.productId)
            //calculate sub total
            const productPrice = getProductDetail.price
            const subTotal = product.quantity * productPrice
            //insert order product
            const payload = {
                orderId: orderId,
                productId: product.productId,
                qty: product.quantity,
                subTotal: subTotal
            }

            await orderPorductServices.createOrderProduct(payload)
        }

        //select order and order product by order id
        const data = await orderService.findById(orderId)
        console.log("DATA ==>> ", data);
        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: data
        });
    }
    catch (err) {
        next({ status: 400, message: err.message })
    }
};

const update = async (req, res, next) => {
    try {
        //---status waiting_payment; processing; failed; done--//
        //---when change status
        //--from waiting payment, check expired date--//
        //---if date > expired date, then set status to failed, else set status to processing/done--//
        const userId = req.user.id
        const id = req.params.id
        const order = await orderService.findById(id)

        if(!order || userId !== order.dataValues.userId) throw new NotFoundError(`order not found`)
        if(order.dataValues.status === 'success') throw new BadRequestError('order is complete, please make a new one')
        await orderService.updateOrder(id, 'success')

        const updatedOrder = await orderService.findById(id)
        updatedOrder.dataValues.status = 'success'
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: updatedOrder,
        });
    } catch (err) {
        next(err)

    }
};

const crontab = async (req, res, next) => {
    try {
        const orderStatus = await orderService.getAllStatus()
        orderStatus.forEach(async (order) => {
            const orderId = order.id
            const currentStatus = order.status
            const expiredAt = new Date(order.expiredAt).valueOf()
            const currentTime = new Date(Date.now()).valueOf()
            const diffTime = (expiredAt - currentTime)
            //if expiredAt - currentTime < 0 set order status to failed
            if (diffTime < 0) {
                if (currentStatus === 'payment_waiting') {
                    orderService.updateOrder(orderId, 'failed')
                }
            }

        })
        return res.status(200).json({ message: 'success', payload: orderStatus })

    } catch (error) {

        return res.status(404).json({ message: 'failed', message: message })

    }

};

//crontab running every 5 minute to check database 
//if there are any order with status payment_waiting, scheduller will check expired time
//if current time more than expired time, status order will change to failed
cron.schedule('* * * * *', async() => {
    await crontab()
});

module.exports = {
    index,
    find,
    create,
    update,
    crontab
}