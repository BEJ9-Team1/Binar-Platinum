const orderService = require('../services/order_services')
const orderPorductServices = require ('../services/orderProduct_services')
const productService = require('../services/productServices')
const {createOrderDTO,updateOrderDTO} = require('../validators/order_validator')
const { Product } = require('../models')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const ProductController = require('./productController');
const cron = require('node-cron');


const index = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const data = await orderService.getAll(userId)
        return res.status(200).json({
            message:'Request Success',
            data:data
        })
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const id = req.params.id
        const data = await orderService.findById(userId,id)
        if (!data) throw new NotFoundError(`order not found`)
        return res.status(200).json({
            message:'Request Success',
            data:data
        }
        )

    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        //let transaction = await sequelize.transaction();

        //reduce stock if available or send error when stock not available 
        const orderDTO = await createOrderDTO.validateAsync(req.body)
        const expiredAt = new Date(Date.now() + (60 * 60 * 1000)).toISOString()
        const productList = req.body.orderProducts
         console.log(productList,"<<<< PRODUCT LIST >>>>>>>")

        productList.forEach(async(product) => {
            const productStock = await productService.findById(product.productId)
            if(!productStock) throw new NotFoundError("Product not Found")
            productId = product.productId
            orderQty = product.quantity
            const availableStock = productStock.stock
            const newStock = availableStock - orderQty
            //check stock
            if(newStock > 0) {
                const payload ={
                    stock:newStock
                }
                const updateStock = await productService.updateProduct(productId, payload)
            }
                else{
                    throw new BadRequestError('stock less than your order')
                }
        });

        const payload = {
            userId:orderDTO.userId,
            paymentMethodId:orderDTO.paymentMethodId,
            totalPrice:orderDTO.totalPrice,
            expiredAt: expiredAt,
            status:"payment_waiting",
        } 
        const result = await orderService.createOrder(payload);
        const orderId = result.dataValues.id
        // insert to db order product
        productList.forEach(async(product) => {
            //get product detail
            id = product.productId
            orderQty = product.quantity
            const getProductDetail = await productService.findById(id)
            //calculate sub total
            const productPrice = getProductDetail.price
            const subTotal = orderQty * productPrice
            //insert order product
            const payload ={
                orderId:orderId,
                productId : product.productId,
                qty : product.quantity,
                subTotal : subTotal
            }
            const insertProductOrder = orderPorductServices.createOrderProduct(payload)

        }

        )
        //await transaction.commit();

        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: result.dataValues
        });
        
    } catch (err) {
       
        // if(transaction) {
        //     await transaction.rollback();
        //  }

         console.error(err);
         next(err);
    }
};

const update = async(req, res, next) => {
    try {
        //---status waiting_payment; processing; failed; done--//
        //---when change status from waiting payment, check expired date--//
        //---if date > expired date, then set status to failed, else set status to processing/done--//
        const orderDTO = await updateOrderDTO.validateAsync(req.body)
        const userId = req.params.userId
        const id = req.params.id
        const order = await orderService.findById(userId, id)

        if (!order) throw new NotFoundError(`order with id ${id} not found`)
        const newStatus =req.body.status
        await orderService.updateOrder(userId, id, newStatus)
      
        const updatedOrder = await orderService.findById(userId, id)
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: updatedOrder,
        });
    } catch (err) {
         return res.status(404).json({ message: 'failed', message: message })

    }
};

const destroy = async(req, res, next) => {
    try {
        const userId = req.params.id
        const user = await userService.destroy(userId)
        if(!user) throw new NotFoundError("User Has Been Deleted")
        const address = await addressService.destroy(userId)
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

const crontab = async(req,res, next)=>{
    try {

        const orderStatus = await orderService.getAllStatus()
        orderStatus.forEach(async(order) => {
            const orderId =  order.id
            const userId = order.userId
            const currentStatus = order.status
            const expiredAt = new Date(order.expiredAt).valueOf()
            const currentTime = new Date(Date.now()).valueOf()
            const diffTime =(expiredAt - currentTime)
            //if expiredAt - currentTime < 0 set order status to failed
            if(diffTime<0){
                if (currentStatus==='payment_waiting'){
                    const newStatus ="failed"
                    await orderService.updateOrder(userId, orderId, newStatus)
                }
            }

        })
        return res.status(200).json({ message: 'success', payload: orderStatus })

    } catch (error) {

        return res.status(404).json({ message: 'failed', message: message })

    }

};

cron.schedule('* 5 * * * *', async() => {
    await crontab()
});

module.exports = {
    index,
    find,
    create,
    update,
    destroy,
    crontab
}