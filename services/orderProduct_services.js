const sequelize = require('sequelize')
const { OrderProduct } = require('../models')
const { getStatusText } = require('http-status-codes')


const createOrderProduct = async (payload) => {
    const {...orderProduct} = payload
    // console.log(payload),"<<<<ORDER PRODUCT SERVICES >>>>")
    const createOrderProduct = await OrderProduct.create({
     ...orderProduct
    }
    );

    return createOrderProduct;
   
}


module.exports = {
    createOrderProduct

}