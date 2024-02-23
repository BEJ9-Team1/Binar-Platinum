const paymentService= require('../services/payment_servies')
const createPaymentDTO = require('../validators/payment_validator')
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

const create = async (req, res, next) => {
    try {
        const PaymentDTO = await createPaymentDTO.validateAsync(req.body)
        
        const payload = {
            name: PaymentDTO.name
        } 

        const lookup = await paymentService.lookup(payload.name)
        if(lookup) throw new BadRequestError(`${lookup.name} has been added`)

        const result = await paymentService.createPayment(payload);
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
        const paymentId = req.params.id
        const newData = {
            name: req.body.name,
        }
        const result = await paymentService.update(item_id ,newData)
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
        const paymentId = req.params.id
        const result = await paymentService.destroy(paymentId)
        if(!result) throw new NotFoundError("Category Has Deleted")
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports=
{
    lookup,
    getAll,
    createPayment,
    update,
    destroy
}