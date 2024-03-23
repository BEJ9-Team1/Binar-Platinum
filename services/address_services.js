const { Address } = require('../models')

const lookup = async (addressId, userId) => {
    const address = await Address.findAll( 
        { 
            where: { id:addressId, userId: userId },
            // include: [{ model: Address, as: 'address' }]
        }        
     )
    return address  
}

const find = async (userId) => {
    const address = await Address.findAll( 
        { 
            where: { userId:userId},
            // include: [{ model: Address, as: 'address' }]
        }        
     )
    return address  
}

const update = async (userId) => {
    const address = await Address.findAll( 
        { 
            where: {userId: userId },
            // include: [{ model: Address, as: 'address' }]
        }        
     )
    return address  
}

const getAll = async (qParams) => {
    const address = await Address.findAndCountAll()
    return address
}


const destroy = async (addressId) => {
    const result = await Address.destroy({
        where: {
            id: addressId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    lookup,
    getAll,
    destroy,
    update,
    find
}