const { Merchant } = require('../models')

const isMerchantExists = async (name) => {
    const merchant = await Merchant.findOne( 
        { 
            where: { name: name },
        }        
     )
    return merchant  
}

const lookup = async (userId) => {
    const merchant = await Merchant.findOne( 
        { 
            where: { userId: userId },
        }        
     )
     console.log(merchant);
    return merchant  
}

const getAll = async (qParams) => {
    const merchant = await Merchant.findAndCountAll({
        attributes: ['id', 'name', 'address'],
        include: [
            'user'
        ]
    })
    return merchant
}

const createMerchant = async (payload) => {
    const { ...merchant} = payload
    const createMerchant = await Merchant.create({
        ...merchant
    },
    );
    return await createMerchant.reload({include: 'user'})

};

const update = async (id, newData) => {
    const result = await Merchant.update(newData, {
        where: {
            id: id,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (userId) => {
    const result = await Merchant.destroy({
        where: {
            userId: userId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    isMerchantExists,
    lookup,
    getAll,
    destroy,
    update,
    createMerchant
}