const { Order, OrderProduct } = require('../models')

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
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
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
     ...orderProduct
    }
    );

    return createOrderProduct;
   
}

const updateOrder = async (orderId, status) => {
    Order.update({
        status: status
    },
    {
        where: {
            id: orderId
        }
    })
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