const Joi = require('joi'); 

const addressDataDTO = Joi.object({ 
   
    userId: Joi.number().required(),
    address: Joi.string().min(1).max(100).required(),
    name: Joi.string().required(),
    isUsed: Joi.boolean().required()
})


const editAddressDataDTO = Joi.object({ 
   
    userId: Joi.number().required(),
    address: Joi.string().min(1).max(100).required(),
    name: Joi.string().required(),
    isUsed: Joi.boolean().required()
})

module.exports ={addressDataDTO,editAddressDataDTO}