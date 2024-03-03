const { Merchant } = require('../models')
const merchant = require('../models/merchant')

const lookup = async (name) => {
    const merchant = await Merchant.findOne( 
        { 
            where: { name: name },
        }        
     )
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
    lookup,
    getAll,
    destroy,
    createMerchant
}