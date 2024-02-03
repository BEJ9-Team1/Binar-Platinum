const { Item } = require('../models')
const {BadRequestError, NotFoundError} = require('../errors/');

const lookup = async (payload) => {
    const {id} = payload
    const item = await Item.findOne({ where: { id: id } })
    if (!item) {
        throw new NotFoundError(`Invalid item id = ${id}`);
    }
    return item  
}

const getAll = async (qParams) => {
    const item = await Item.findAndCountAll()
    return item
}


const createItem = async (req, res) => {
    const { name, Qty, price,} = req.body;
    const check = await Item.findOne({ where: { name: name } });
    if (check){
        throw new BadRequestError('Item has been added, you can update the quantity')
    } 

    const item = await Item.create({
        name,
        Qty,
        price
    });

    return item;

};

const updateQty = async (itemId, decreaseItemQty) =>{
    const updateItem = await Item.findOne({
        where: {
            id: itemId
        }
    })

    updateItem.name = updateItem.name
    updateItem.Qty = decreaseItemQty
    updateItem.price = updateItem.price
    await updateItem.save()
    return updateItem
    
};

const update = async (itemId, payload) => {
    console.log(itemId);
    const result = await Item.update(payload, {
        where: {
            id: itemId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    lookup,
    getAll,
    createItem,
    updateQty,
    update
    // updateMenu,
    // deleteMenu
}