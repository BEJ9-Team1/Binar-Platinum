const { Order, User, Seller, Item, Shipment } = require('../models')

const getUserHistory = async (params) => {
    const orderHistroy = await User.findOne({
        where: {id: params},
        attributes: ['id', 'username', 'name'],
        include: [
        {
        model: Order, attributes:
            ['id', 'item_id', 'seller_id', 'shipment_id', 'total_qty', 'total_price','isPaid', 'createdAt', 'updatedAt'],
        as: 'order',
        order: [
            ['createdAt', 'DESC']
          ], 
        include: [
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
        }
        ],

    })
    return orderHistroy
}
module.exports = {getUserHistory}