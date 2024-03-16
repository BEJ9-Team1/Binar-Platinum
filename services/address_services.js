const { Address } = require('../models')

const lookup = async (id, userId) => {
    const address = await Address.findAll( 
        { 
            where: {
                id: id, 
                userId: userId 
            },
        }        
     )
    return address  
}

const getAll = async (qParams) => {
    const address = await Address.findAndCountAll()
    return address
}


const destroy = async (id, userId) => {
    const result = await Address.destroy({
        where: {
            id: id, 
            userId: userId 
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