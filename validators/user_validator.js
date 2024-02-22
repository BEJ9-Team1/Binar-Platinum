const Joi = require('joi'); 

const regsiterUserDTO = Joi.object({ 
    firstName: Joi.string().trim().min(5).required(),
    lastName: Joi.string().trim().min(5).required(),
    userName: Joi.string().trim().min(5).required(),
    email: Joi.string().email().trim().min(8).required(),
    phoneNumber: Joi.string().trim().min(5).required(),
    password: Joi.string().min(8).required(),
    role: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
})

module.exports = regsiterUserDTO