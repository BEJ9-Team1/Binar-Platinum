const Joi = require('joi');

const createProductDTO = Joi.object({
    name: Joi.string().trim().min(5).required(),
    categoryId: Joi.number().integer().required(),
    description: Joi.string().trim().required(),
    merchantId: Joi.number().integer(),
    price: Joi.number().positive().required(),
    stock: Joi.number().positive().integer().required()
})

const updateProductDTO = Joi.object({
    name: Joi.string().trim().min(5),
    description: Joi.string().trim(),
    price: Joi.number().positive(),
    stock: Joi.number().positive().integer()
})

module.exports = {
    createProductDTO,
    updateProductDTO
}