const sequelize = require('sequelize')
const { OrderProduct } = require('../models')
const { getStatusText } = require('http-status-codes')


const createOrderProduct = async (payload, t) => {
    const {...orderProduct} = payload
    const createOrderProduct = await OrderProduct.create({
     ...orderProduct
    },
    {
        transaction: t
    }
    );

    return createOrderProduct;
   
}


module.exports = {
    createOrderProduct

}