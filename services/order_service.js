const { Order, User, Seller, Item, Shipment } = require('../models')
const {BadRequestError,NotFoundError} = require('../errors/');
const {updateQty} = require('./item_service')


const lookup = async (id) => {
    const user = await Order.findOne({ where: { id: id } })
    if (!user) {
        throw new Error('Invalid order id');
    }
    return user  
}

const getAll = async (qParams) => {
    const order = await Order.findAndCountAll({
        order: [
            ['updatedAt', 'DESC']
          ], 
        attributes: ['id', 'total_qty', 'total_price', 'isPaid', 'createdAt', 'updatedAt'],
        include: [
        {
        model: User, attributes:
            ['username', 'name'],
        as: 'user'
        },
        {
        model: Item, attributes:
            ['name', 'price'],
        as: 'item'
        },
        {
        model: Seller, attributes:
            ['name', 'location'],
        as: 'seller'
        },
        {
        model: Shipment, attributes:
            ['isDelivered'],
        as: 'shipment'
        }
    ],

    })
    return order
}


const getOne = async (orderId) => {
    const order = await Order.findOne({
        where: {id: orderId},
        order: [
            ['updatedAt', 'DESC']
          ], 
        attributes: ['id', 'total_qty', 'total_price', 'isPaid', 'createdAt', 'updatedAt'],
        include: [
        {
        model: User, attributes:
            ['username', 'name'],
        as: 'user'
        },
        {
        model: Item, attributes:
            ['name', 'price'],
        as: 'item'
        },
        {
        model: Seller, attributes:
            ['name', 'location'],
        as: 'seller'
        },
        {
        model: Shipment, attributes:
            ['isDelivered'],
        as: 'shipment'
        }
    ],

    })
    return order
}

const createOrder = async (orderPayload, userId) => {
    const {item_name, seller_name, total_qty, isPaid} = orderPayload.body;

    const item = await Item.findOne({where: {name: item_name}});
    const seller = await Seller.findOne({where: {name: seller_name}});

    let itemQty = item.Qty;

    if(itemQty === 0){
        throw new NotFoundError(`${item.name} was sold out`)
    } else if(total_qty <= 0){
        throw new BadRequestError('Quantity Must More Than 0')
    } else {
        let totalPrice = total_qty * item.price;
        let decreaseItemQty = item.Qty - total_qty;
    
        const newOrder = await Order.create({
            user_id: userId, 
            item_id: item.id,
            seller_id: seller.id,
            total_qty: total_qty, 
            total_price: totalPrice, 
            isPaid: false || isPaid,
        });
        await updateQty(item.id, decreaseItemQty)
        return newOrder;
    }

}

const update = async (orderId, payload) => {
    const result = await Order.update(payload, {
        where: {
            id: orderId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (id) => {
    const deleteOrder = await Order.destroy({
        where: {
            id: id
        },
        individualHooks: true
    })
    return deleteOrder
}

module.exports = {
    getAll,
    createOrder,
    update,
    lookup,
    getOne,
    destroy
}