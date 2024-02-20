const categoryService = require('../services/category_services')
const { StatusCodes } = require('http-status-codes');

const index = async (req, res) => {
    try {
        const params = req.qs
        const data = await categoryService.getAll(params)

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
        const result = await categoryService.lookup(req.params);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        const result = await categoryService.createCategory(req);
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
        }
        const result = await categoryService.update(item_id ,newData)
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