const categoryService = require('../services/category_services')
const createCategoryDTO = require('../validators/category_validator')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const index = async (req, res,next) => {
    try {
        const params = req.qs
        //passing getAll service
        const data = await categoryService.getAll(params)

        return res.status(200).json({
            status: 200,    
            message: 'Request Success',
            data: data
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
        //passing lookup service
        const result = await categoryService.lookup(req.params.name);
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
        //validate request body
        const categoryDTO = await createCategoryDTO.validateAsync(req.body)
        
        const payload = {
            name: categoryDTO.name
        } 
        //passing lookup service
        const lookup = await categoryService.lookup(payload.name)
        if(lookup) throw new BadRequestError(`${lookup.name} has been added`)

        //passing createCategory service
        const result = await categoryService.createCategory(payload);
        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: result.dataValues
        });
        
    } catch (err) {
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        //validate request body
        const categoryDTO = await createCategoryDTO.validateAsync(req.body)
        const categoryId = req.params.id
        const newData = {
            name: categoryDTO.name,
        }
        //passing update service
        const result = await categoryService.update(categoryId ,newData)
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async(req, res, next) => {
    try {
        const categoryId = req.params.id
        //passing destroy service
        const result = await categoryService.destroy(categoryId)
        if(!result) throw new NotFoundError("Category Has Deleted")
        res.status(StatusCodes.OK).json({
            message: "Success",
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
    find,
    destroy
}