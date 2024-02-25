const Joi = require('joi'); 

const addressDataDTO = Joi.object({ 
   
    userId: Joi.number().optional(),
    address: Joi.string().min(1).max(100).required(),
    name: Joi.string().required(),
    isUsed: Joi.boolean().optional()
})

module.exports = addressDataDTO