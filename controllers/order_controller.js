const orderServices = require('../services/order_service')
const {Shipment} = require('../models')
const {decodeJWT} = require('../middlewares/auth-jwt')
const {NotFoundError} = require('../errors/')
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await orderServices.getAll(params)

        return res.status(200).json({
            status: 200,    
            message: 'Request Success',
            data: data
        })

    } catch (error) {
        console.log(error)
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await orderServices.getOne(req.params.id);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        console.log(error)
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        // Verify the token using jwt.verify method
        let decode = await decodeJWT(token)

        const result = await orderServices.createOrder(req, decode.id);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const update = async(req, res, next) => {
    try {
        const order_id = req.params.id
        let checkOrder = await orderServices.lookup(order_id);
        let checkShip = await Shipment.findOne({where: {isDelivered: req.body.isDelivered}});
        if(!checkShip) throw new NotFoundError('Shipment Status Not Vaialable');

        const newData = {
            user_id: checkOrder.user_id,
            item_id: checkOrder.item_id,
            seller_id: checkOrder.seller_id,
            shipment_id: checkShip.id,
            total_qty: checkOrder.total_qty,
            total_price: checkOrder.total_price,
            isPaid: req.body.isPaid
        }
        const result = await orderServices.update(order_id ,newData)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const orderId = req.params.id     
        await orderServices.lookup(req.params.id)

        const result = await orderServices.destroy(orderId)
         
        return res.status(204).json({
            code: 201,
            message: 'Request Success',
            data: result
        })
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};


module.exports = {
    create,
    index,
    update,
    find,
    destroy
}