const orderService = require('../services/order_services')
const orderPorductServices = require('../services/orderProduct_services')
const { OrderProduct, Product, sequelize } = require('../models')
const productService = require('../services/productServices')
const { createOrderDTO, updateOrderDTO } = require('../validators/order_validator')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const cron = require('node-cron');


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
        const order = await orderService.findById(userId, id)
        if (!order) throw new NotFoundError(`order not found`)
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

        const result = await sequelize.transaction(async (t) => {

 //not using transaction, so product stock will check first
        const orderDTO = await createOrderDTO.validateAsync(req.body)
        //expired time set 60 minutes
        const expiredAt = new Date(Date.now() + (60 * 60 * 1000)).toISOString()
        const productList = req.body.orderProducts
        
        //reduce stock, update stock in db product
        let totalPrice = 0

        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            const productId = product.productId
            const productStock = await productService.findById(productId)
            if (productStock) {
                availableStock = productStock.stock
                const newStock = availableStock - product.quantity
                if (newStock < 0) throw new BadRequestError('Stock less than your order')
            } else
                throw new NotFoundError("Product not Found")
            const subTotal = productStock.dataValues.price * product.quantity
            totalPrice += subTotal
            const payload = { stock: newStock }
            const update = await productService.updateProduct(productId, payload,t)    
            }

        //insert to db order
        const payload = {
            userId: req.user.id,
            paymentMethodId: orderDTO.paymentMethodId,
            totalPrice: totalPrice,
            expiredAt: expiredAt,
            status: "payment_waiting",
        }
        const result = await orderService.createOrder(payload, t);

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
            await orderPorductServices.createOrderProduct(payload, t)
        }

        //select order and order product by order id
        const data = await orderService.findById(req.user.id, orderId)

        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: data
        });

      
        });
      
        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)
      
      } catch (error) {
        next(error)
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
      
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
        const order = await orderService.findById(userId, id)

        if (!order) throw new NotFoundError(`order not found`)
        if (order.dataValues.status === 'success') throw new BadRequestError('order is complete, please make a new one')
        await orderService.updateOrder(id, 'success')

        const updatedOrder = await orderService.findById(userId, id)
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
            if (diffTime < 0 && currentStatus === 'payment_waiting') {
                await orderService.updateOrder(orderId, 'failed')
                const orderProduct = await OrderProduct.findAll({
                    where: {
                        orderId: orderId
                    }
                })

                for (let i = 0; i < orderProduct.length; i++) {
                    await Product.increment({
                        stock: orderProduct[i].dataValues.qty
                    }, {
                        where:
                        {
                            id: orderProduct[i].dataValues.productId
                        }
                    })
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
cron.schedule('* * * * *', async () => {
    await crontab()
});

module.exports = {
    index,
    find,
    create,
    update,
    crontab
}