const Joi = require('joi'); 

const createPaymentDTO = Joi.object({ 
    name: Joi.string().trim().lowercase().min(3).required()
})

module.exports = createPaymentDTO