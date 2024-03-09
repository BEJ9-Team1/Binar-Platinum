const Joi = require('joi'); 

const createMediaDTO = Joi.object({ 
    url: Joi.string().trim().lowercase().min(5).required(),
    ParentId:Joi.integer().trim().required(),
    Role: Joi.string().trim().lowercase().min(4).required(),
})

module.exports = createMediaDTO