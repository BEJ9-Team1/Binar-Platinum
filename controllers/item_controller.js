const itemServices = require('../services/item_service')
const { StatusCodes } = require('http-status-codes');

const index = async (req, res) => {
    try {
        const params = req.qs
        const data = await itemServices.getAll(params)

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
        const result = await itemServices.lookup(req.params);
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
        const result = await itemServices.createItem(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        const item_id = req.params.id
        const newData = {
            name: req.body.name,
            Qty: req.body.Qty,
            price: req.body.price,
        }
        const result = await itemServices.update(item_id ,newData)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    create,
    index,
    update,
    find
}