const sellerServices = require('../services/seller_service')
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await sellerServices.getAll(params)

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

const create = async (req, res, next) => {
    try {
        const result = await sellerServices.createSeller(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await sellerServices.lookup(req.params);
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

const update = async(req, res, next) => {
    try {
        const userId = req.params.id
        await sellerServices.lookup(req.params);
        const newData = {
            name: req.body.name,
            location: req.body.location,
        }

        const result = await sellerServices.update(userId ,newData)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const userId = req.params.id     
        
        const userData = await sellerServices.lookup(req.params)
        if(!userData) throw new Error(`User with id ${userId} not exists`)

        const result = await sellerServices.destroy(userId)
         
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
    destroy,
    find
}