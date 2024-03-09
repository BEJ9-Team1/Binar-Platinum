const sequelize = require('sequelize')
const { Order, OrderProduct } = require('../models')
const { getStatusText } = require('http-status-codes')

const getAll = async (userId) => {
    const orders = await Order.findAndCountAll( 
        {where: { userId: userId },
        include: {
            model: OrderProduct,
            as: 'orderProduct',
            attributes: ['id','productId','qty','subTotal']
        }
        }
    )
    return orders
}

const findById = async (userId,id) => {
    const orders = await Order.findOne( 
        { where: { userId: userId, id:id },
        include: {
            model: OrderProduct,
            as: 'orderProduct',
            attributes: ['id','productId','qty','subTotal']
        }
        
     }
    )
    return orders
}


const createOrder = async (payload) => {
    const { ...order } = payload
    const createOrder = await Order.create({
        ...order
    }
    );

    return createOrder;
      d
}

const createOrderProduct = async (payload) => {
    const {...orderProduct} = payload
    const createOrderProduct = await OrderProduct.create({
     ...OrderProduct
    }
    );

    return createOrderProduct;
   
}

const updateOrder = async (userId,id,newStatus) => {

    const updateOrder = await Order.update(
        { 
            status:newStatus, 
            updatedAt:new Date()
        },
        {
            where: {
                userId: userId,
                id: id
            }
        })

    return updateOrder
};


const getAllStatus =async () => {
    const getOrderStatus = await Order.findAll({
        attributes: ['id', 'userId', 'status','expiredAt'],

    })
    return getOrderStatus
};

module.exports = {
    getAll,
    findById,
    createOrder,
    createOrderProduct,
    updateOrder,
    getAllStatus
}