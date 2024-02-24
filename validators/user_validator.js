const Joi = require('joi'); 

const regsiterUserDTO = Joi.object({ 
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().trim().min(5),
    userName: Joi.string().trim().min(5).required(),
    email: Joi.string().email().trim().lowercase().min(8).required(),
    phoneNumber: Joi.string().trim().min(5).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
    role: Joi.number().integer().required(),
    isActive: Joi.boolean().required(),
})

module.exports = regsiterUserDTO