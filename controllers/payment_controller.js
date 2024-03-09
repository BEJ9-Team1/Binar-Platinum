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
        console.log(result)
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
        const lookup = await paymentService.lookup(PaymentDTO.name)
        if(lookup) throw new BadRequestError(`${lookup.name} has been added`)
        const payload = {
            name: PaymentDTO.name
        } 
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
        const checkDuplicate = await paymentService.lookup(req.body.name)
        console.log(checkDuplicate)
        if(checkDuplicate) throw new BadRequestError(`${checkDuplicate.name} has been added`)
        const PaymentDTO = await createPaymentDTO.validateAsync(req.body)
        const newData = {
            name: PaymentDTO.name
        }
        const result = await paymentService.update(paymentId ,newData)
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
        if(!result) throw new NotFoundError("Payment Has Deleted")
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
    index,
    find,
    create,
    update,
    destroy
}