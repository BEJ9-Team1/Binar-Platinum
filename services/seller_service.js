const { Seller } = require('../models')
const {BadRequestError, NotFoundError} = require('../errors/');

const lookup = async (payload) => {
    const {id} = payload
    const seller = await Seller.findOne({ where: { id: id } })
    if (!seller) {
        throw new NotFoundError('Invalid Seller id');
    }
    return seller  
}

const getAll = async (qParams) => {
    const seller = await Seller.findAndCountAll() 
    return seller
}


const createSeller = async (req, res) => {
    const { name, location} = req.body;
    const check = await Seller.findOne({ where: { name: name } });
    if (check){
        throw new BadRequestError('Seller name has been used')
    } 

    const item = await Seller.create({
        name,
        location
    });

    return item;

}

const update = async (sellerId, payload) => {
    const result = await Seller.update(payload, {
        where: {
            id: sellerId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (id) => {
    const deleteSeller = await Seller.destroy({
        where: {
            id: id
        }
    })
    return deleteSeller
}

module.exports = {
    getAll,
    createSeller,
    update,
    destroy,
    lookup
    // updateMenu,
    // deleteMenu
}