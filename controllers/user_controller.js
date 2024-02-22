const userService = require('../services/user_services')
const regsiterUserDTO = require('../validators/user_validator')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const index = async (req, res) => {
    try {
        const params = req.qs
        const data = await userService.getAll(params)

        return res.status(StatusCodes.OK).json({  
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
        const result = await userService.lookup(req.params.email);
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
        const userDTO = await regsiterUserDTO.validateAsync(req.body)
        
        const payload = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            userName: userDTO.userName,
            email: userDTO.email,
            phoneNumber: userDTO.phoneNumber,
            password: userDTO.password,
            role: userDTO.role,
            isActive: userDTO.isActive
        } 

        const lookup = await userService.lookup(payload.email)
        if(lookup) throw new BadRequestError(`${lookup.email} has been registered before`)

        const result = await userService.registerUser(payload);
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
        const user_id = req.params.id
        const userDTO = await regsiterUserDTO.validateAsync(req.body)
        
        const newData = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            userName: userDTO.userName,
            email: userDTO.email,
            phoneNumber: userDTO.phoneNumber,
            password: userDTO.password,
            role: userDTO.role,
            isActive: userDTO.isActive
        }

        const result = await userService.update(user_id ,newData)
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
        const userId = req.params.id
        const result = await userService.destroy(userId)
        if(!result) throw new NotFoundError("User Has Deleted")
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    create,
    update,
    destroy
}