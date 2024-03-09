const Joi = require('joi'); 

const createOrderDTO = Joi.object({ 
    userId: Joi.number().required(),
    paymentMethodId: Joi.number().required(),
    totalPrice:Joi.number().required(),
    status:Joi.string().required(),
    orderProducts:Joi.array().optional()
})

const updateOrderDTO = Joi.object({  
    status:Joi.string().required().valid('payment_waiting', 'failed','processing','done')
})


module.exports = {createOrderDTO,updateOrderDTO}