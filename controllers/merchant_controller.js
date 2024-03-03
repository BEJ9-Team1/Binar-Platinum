const merchantService = require('../services/merchant_services')
const userService = require('../services/user_services')
const addressService = require('../services/address_services')
const createMerchantDTO = require('../validators/merchant_validator')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const address = require('../models/address');

const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await merchantService.getAll(params)

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
        const result = await addressService.lookup(req.params.id);
        console.log(req.params.id)
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
         const merchantDTO = await createMerchantDTO.validateAsync(req.body)
         const userId = req.user.id
        
        //update role in user

        const dataUser = await userService.lookup(userId)

        const updateRoleUser = {
            ...dataUser,
            role: 'merchant'
        }
        const userAddress = await addressService.lookup(userId)
        const updateRole = await userService.updateRole(userId, updateRoleUser)
        

        let addressId = []
        for(let i = 0; i < userAddress.length ; i++){
            addressId.push(userAddress)
        }
        
        const newData = {
            userId: userId,
            name: merchantDTO.name,
            address: addressId
        } 

        const checkMerchant = await merchantService.lookup(newData.name)
        if(checkMerchant) throw new BadRequestError("Merchant Name Has Been Used, Choose Another One")

        const result = await merchantService.createMerchant(newData)

        res.status(StatusCodes.CREATED).json({
            message: "Success",
            payload: result
        });
        
    } catch (err) {
        next(err);
    }
};
const update = async(req, res, next) => {
    try {
        const addressData = await addressDataDTO.validateAsync(req.body)
        const lookup = await addressService.lookup(req.params.id)
        if(!lookup)  throw new BadRequestError(`Address not found`)

        const address_id = req.params.id
        const newData = {
            userid: addressData.userid,
            address: addressData.address,
            name: addressData.name ?? lookup.dataValues.name,
            isUsed: addressData.isUsed
        }


        const result = await addressService.update(address_id ,newData)
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
        const addressId = req.params.id
        const result = await addressService.destroy(addressId)
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