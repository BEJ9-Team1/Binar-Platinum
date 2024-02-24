const addressService = require('../services/address_services')
const {addressDataDTO,editAddressDataDTO} = require('../validators/address_validator')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const address = require('../models/address');

const index = async (req, res) => {
    try {
        const params = req.qs
        const data = await addressService.getAll(params)

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
         const addressData = await addressDataDTO.validateAsync(req.body)
        
        const payload = {
            userId: addressData.userId,
            address:addressData.address,
            name: addressData.name,
            isUsed:addressData.isUsed
        } 

        // const lookup = await addressService.lookup(payload.address)
        // if(lookup) throw new BadRequestError(`${lookup.address} has been added`)

        const result = await addressService.add(payload);
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
        const addressData = await editAddressDataDTO.validateAsync(req.body)
        const lookup = await addressService.lookup(req.params.id)
        if(!lookup)  throw new BadRequestError(`Address not found`)

        const address_id = req.params.id
        const newData = {
            userid: addressData.userid,
            address: addressData.address,
            name: addressData.name,
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