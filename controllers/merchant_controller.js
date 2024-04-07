const authToken = require('../controllers/auth_controller')
const merchantService = require('../services/merchant_services')
const userService = require('../services/user_services')
const addressService = require('../services/address_services')
const createMerchantDTO = require('../validators/merchant_validator')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const index = async (req, res, next) => {
    try {
        const params = req.qs
        //passing to getall service
        const data = await merchantService.getAll(params)

        return res.status(200).json({
            status: 200,
            message: 'Request Success',
            data: data
        })

    } catch (error) {
        if (error.message) {
            next({ status: 400, message: error.message, data: {} })
        }
        next(error)
    }
}


const find = async (req, res, next) => {
    try {
        //find merchant name
        const result = await merchantService.isMerchantExists(req.params.name);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        if (error.message) {
            next({ status: 400, message: error.message, data: {} })
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
        //get user address
        const userAddress = await addressService.find(userId)
        //updating user role from buyer to merchant
        const updateRole = await userService.updateRole(userId, updateRoleUser)
        //validate merchant name
        const checkMerchant = await merchantService.isMerchantExists(merchantDTO.name)
        if (checkMerchant) throw new BadRequestError("Merchant Name Has Been Used, Choose Another One")
        //validate user has merchant
        const isHaveMerchant = await merchantService.lookup(userId)
        if (isHaveMerchant) throw new BadRequestError(`You Has Have Merchant Named ${isHaveMerchant.name}, Go Update Your Merchant. 1 Account Just For 1 Merchant`)

        //collect addressId for insert to table
        let addressId = []
        for (let i = 0; i < userAddress.length; i++) {
            addressId.push(userAddress)
        }

        const newData = {
            userId: userId,
            name: merchantDTO.name,
            address: addressId
        }

        const updateDataUser = await userService.lookup(userId)
        const result = await merchantService.createMerchant(newData)
        //refreshToken is a function for regenerate token after updating data user
        const refreshToken = await authToken.refreshToken(userId, updateDataUser.userName, updateDataUser.role, updateDataUser.isActive)

        res.status(StatusCodes.CREATED).json({
            message: "Success",
            refreshToken: refreshToken,
            payload: result
        });

    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        //validate request body
        const merchantDTO = await createMerchantDTO.validateAsync(req.body)
        //validate merchant name
        const lookup = await merchantService.isMerchantExists(merchantDTO.name)
        if (lookup) throw new BadRequestError("Merchant Name Has Been Used, Choose Another One")

        const oldData = await merchantService.lookup(req.user.id)
        const reuseData = oldData.dataValues

        const newData = {
            userId: reuseData.userId,
            name: merchantDTO.name,
            address: reuseData.address
        }


        const result = await merchantService.update(reuseData.id, newData)
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