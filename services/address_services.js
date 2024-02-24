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


const add = async (payload) => {
    const { ...address } = payload
    const createAddress = await Address.bulkCreate({
        ...address
    });
    // const { userId, address, isUsed } = payload
    // const createAddress = await Address.create({
    //     userId:userId,
    //     address:address,
    //     isUsed:isUsed
    // });
    return createAddress;

};


const update = async (AddressId, payload) => {
    const result = await Address.update(payload, {
        where: {
            id: AddressId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (AddressId) => {
    const result = await Address.destroy({
        where: {
            id: AddressId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    lookup,
    getAll,
    add,
    update,
    destroy
}