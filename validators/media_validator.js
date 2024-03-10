const Joi = require('joi'); 
const ImageRolesEnum = require('../config/enum/media_type_enum');

const createMediaDTO = Joi.object({ 
    role: Joi.string().valid(...ImageRolesEnum)
})

module.exports = createMediaDTO