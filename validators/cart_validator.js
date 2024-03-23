const Joi = require('joi'); 

const createCartDTO = Joi.object({ 
    productId:Joi.string().required(),
    qty:Joi.number().integer().required(),
})

const updateCartDTO = Joi.object({ 
    qty:Joi.number().integer().required(),
})

module.exports = {
    createCartDTO, 
    updateCartDTO
}