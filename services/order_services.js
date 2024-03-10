const sequelize = require('sequelize')
const { Order, OrderProduct } = require('../models')
const { getStatusText } = require('http-status-codes')
const order = require('../models/order')

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

const findById = async (id) => {
    const orders = await Order.findOne( 
        { where: { id: id },
        include: {
            model: OrderProduct,
            as: 'orderProduct',
            attributes: ['id','productId','qty','subTotal']
        }
        
     }
    )
    return orders
}

//include productid
const createOrder = async (payload) => {
    const { ...order } = payload
    const createOrder = await Order.create({
        ...order
    }
    );

    return createOrder;
    
}

const createOrderProduct = async (payload) => {
    const {...orderProduct} = payload
    const createOrderProduct = await OrderProduct.create({
     ...OrderProduct
    }
    );

    return createOrderProduct;
   
}

const updateOrder = async (oldorder,newData) => {
    const {status, ...order}=newData
    const updateOldorder = Object.assign(oldorder,newData)
    await oldorder.save()
    if(oldorder.status){
    oldorder.status= status
    console.log(oldorder.status)
    await oldorder.save();
    }
    return updateOldorder.reload()
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