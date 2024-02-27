const userService = require('../services/user_services')
const addressService = require('../services/address_services')
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
        const result = await userService.emailIsExists(req.params.email);
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

        const lookup = await userService.emailIsExists(userDTO.email)
        if (lookup){
            throw new BadRequestError(`${lookup.email} has been registered before`)
        } else if(userDTO.password !== userDTO.confirmPassword){
            throw new BadRequestError('Password NOT Match With Confirm Password')
        };


        const payload = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            userName: userDTO.userName,
            email: userDTO.email,
            phoneNumber: userDTO.phoneNumber,
            password: userDTO.password,
            role: userDTO.role,
            isActive: userDTO.isActive,
            address: userDTO.address
        } 


        const result = await userService.registerUser(payload);
        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: result.dataValues
        });
        
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        const userId = req.params.id
        const userDTO = await regsiterUserDTO.validateAsync(req.body)

        const oldAddress = await addressService.lookup(userId)
        const oldDataUser = await userService.lookup(userId)
        if(!oldDataUser) throw new NotFoundError(`Account with email ${oldDataUser.email} Not Found`)

        const newData = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName ?? lookup.dataValues.name,
            userName: userDTO.userName,
            email: userDTO.email,
            phoneNumber: userDTO.phoneNumber,
            password: userDTO.password,
            role: userDTO.role,
            isActive: userDTO.isActive,
            address: userDTO.address
        }


        const result = await userService.update(userId, oldAddress, oldDataUser ,newData)
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

module.exports = {
    index,
    find,
    create,
    update,
    destroy
}