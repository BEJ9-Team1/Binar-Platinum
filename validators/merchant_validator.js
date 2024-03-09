const Joi = require('joi'); 

const createMerchantDTO = Joi.object({ 
    name: Joi.string().trim().min(3).required()
})

module.exports = createMerchantDTO