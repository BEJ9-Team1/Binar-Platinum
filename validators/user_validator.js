const Joi = require('joi'); 
const addressDataDTO = require('./address_validator');
const UserRolesEnum = require('../config/enum/user_role_enum');

const regsiterUserDTO = Joi.object({ 
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().optional(),
    userName: Joi.string().trim().min(5).lowercase().required(),
    email: Joi.string().email().trim().lowercase().min(8).required(),
    phoneNumber: Joi.string().trim().min(5).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().min(8).required(),
    role: Joi.string().valid(...UserRolesEnum),
    address: Joi.array().items(addressDataDTO).min(1).optional()
})

module.exports = regsiterUserDTO