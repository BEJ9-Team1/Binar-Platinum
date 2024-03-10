const { Cart, CartItem } = require('../models')

const lookup = async (cartId) => {
    const cartItem = await CartItem.findByPk( cartId,
        { 
            include: ['Cart']
        }        
     )
    return cartItem  
}

const lookupUserCart = async (userId) => {
    const cart = await Cart.findOne({ where: { userId: userId } })   
    return cart
}


const getAll = async (userId) => {
    const cart = await Cart.findAndCountAll(
        {where:{
            userId:userId
        },include: ['Cartitem']}
    )
    return cart
}

const createCart = async (userId) => {
    const registerCart = await Cart.create({
        userId: userId
    }
    );

    return registerCart;
   
}

const createCartItems = async (payload) => {
    const { ...cartItems } = payload
    const registerCartItems = await CartItem.create({
        ...cartItems,
    },
    );

    return registerCartItems;
   
}

const update = async (cartItemId, payload) => {
    const result = await CartItem.update(payload, {
        where: {
            id: cartItemId,
        },
        // individualHooks: true
    })
    return result
};

module.exports = {
    lookup,
    lookupUserCart,
    getAll,
    createCart,
    createCartItems,
    update
}