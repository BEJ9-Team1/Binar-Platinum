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
        const result = await merchantService.isMerchantExists(req.params.name);
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

        const checkMerchant = await merchantService.isMerchantExists(newData.name)
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
//NOT YET//
const update = async(req, res, next) => {
    try {
        const merchantDTO = await createMerchantDTO.validateAsync(req.body)

        const lookup = await merchantService.isMerchantExists(merchantDTO.name)
        if(lookup)  throw new BadRequestError("Merchant Name Has Been Used, Choose Another One")

        const oldData = await merchantService.lookup(req.user.id)
        const reuseData = oldData.dataValues

        const newData = {
            userId: reuseData.userId,
            name: merchantDTO.name,
            address: reuseData.address
        } 


        const result = await merchantService.update(reuseData.id,newData)
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
    find
}