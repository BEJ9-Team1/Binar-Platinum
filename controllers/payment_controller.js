const paymentService= require('../services/payment_servies')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

const index = async (req,res)=>{
    try{
        const data = await paymentService.getAll()

        return res.status(200).json({
            status:200,
            message:'Request Success',
            data:data
        })
    }catch(error){
        if(error.message){
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await paymentService.lookup(req.params.name);
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