const addressService = require('../services/address_services')
const {addressDataDTO} = require('../validators/address_validator')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');
const address = require('../models/address');

const index = async (req, res) => {
    try {
        const params = req.qs
        //passing dataId for getAll service
        const data = await addressService.getAll(params)

        return res.status(200).json({
            status: 200,    
            message: 'Request Success',
            data: data
        })

    } catch (error) {
        console.error(err);
        next(error)
    }
}


const find = async (req, res, next) => {
    try {
        //passing dataId for lookup service
        const result = await addressService.lookup(req.params.id, req.user.id);
        console.log(result);
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


const destroy = async(req, res, next) => {
    try {
        const addressId = req.params.id
        //passing dataId for destroy service
        const result = await addressService.destroy(addressId)
        if(!result) throw new NotFoundError("Address Has Deleted")
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
    destroy
}