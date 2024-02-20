const userServices = require('../services/user_service')
const userHistoryServices = require('../services/historyOrder_services')
const { StatusCodes } = require('http-status-codes');
const {decodeJWT} = require('../middlewares/auth-jwt')


const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await userServices.getAll(params)

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
};

const find = async (req, res, next) => {
    try {
        const result = await userServices.lookup(req.params);
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

const findHistory = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        // Verify the token using jwt.verify method
        let decode = await decodeJWT(token)
        const result = await userHistoryServices.getUserHistory(decode.id);
        
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
        const result = await userServices.createUser(req);
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        const userId = req.params.id
        await userServices.lookup(req.params)
        const newData = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            isDeleted: req.body.isDeleted
        }

        const result = await userServices.update(userId ,newData)
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const userId = req.params.id     
        
        const userData = await userServices.lookup(req.params)
        if(!userData) throw new Error(`User with id ${userId} not exists`)

        const result = await userServices.destroy(userId)
         
        return res.status(204).json({
            code: 201,
            message: 'Request Success',
            data: result
        })
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};



module.exports = {
    create,
    index,
    find,
    update,
    destroy,
    findHistory
}