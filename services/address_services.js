const { Address } = require('../models')

const lookup = async (userId) => {
    const address = await Address.findAll( 
        { 
            where: { userId: userId },
            // include: [{ model: Address, as: 'address' }]
        }        
     )
    return address  
}

const getAll = async (qParams) => {
    const address = await Address.findAndCountAll()
    return address
}


const destroy = async (userId) => {
    const result = await Address.destroy({
        where: {
            userId: userId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    lookup,
    getAll,
    destroy
}