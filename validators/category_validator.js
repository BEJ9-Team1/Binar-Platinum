const Joi = require('joi'); 

const createCategoryDTO = Joi.object({ 
    name: Joi.string().trim().lowercase().min(5).required()
})

module.exports = createCategoryDTO