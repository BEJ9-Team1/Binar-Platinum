const Joi = require('joi'); 

const addressData = Joi.object({ 
   
    userId: Joi.number().required(),
    address: Joi.string().min(1).max(100).required(),
    isUsed: Joi.boolean().required()
})

module.exports = addressData