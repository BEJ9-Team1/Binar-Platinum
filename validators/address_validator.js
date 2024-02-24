const Joi = require('joi'); 

const addressDataDTO = Joi.object({ 
   
    userId: Joi.number().optional(),
    address: Joi.string().min(1).max(100).required(),
    name: Joi.string().required(),
    isUsed: Joi.boolean().optional()
})


// const editAddressDataDTO = Joi.object({ 
   
//     userId: Joi.number().optional(),
//     address: Joi.string().min(1).max(100).required(),
//     name: Joi.string().optional(),
//     isUsed: Joi.boolean().required()
// })

module.exports = addressDataDTO