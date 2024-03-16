const Joi = require('joi'); 

const createCategoryDTO = Joi.object({ 
    name: Joi.string().trim().lowercase().min(3).required()
})

module.exports = createCategoryDTO