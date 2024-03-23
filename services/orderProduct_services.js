const sequelize = require('sequelize')
const { OrderProduct } = require('../models')
const { getStatusText } = require('http-status-codes')


const createOrderProduct = async (payload) => {
    const {...orderProduct} = payload
    const createOrderProduct = await OrderProduct.create({
     ...orderProduct
    }
    );

    return createOrderProduct;
   
}


module.exports = {
    createOrderProduct

}