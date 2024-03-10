const { Cart, CartItem } = require('../models')

const lookup = async (cartId) => {
    const cartItem = await CartItem.findByPk( cartId,
        { 
            include: ['Cart']
        }        
     )
    return cartItem  
}


const getAll = async () => {
    const cart = await CartItem.findAndCountAll(
        {include: ['Cart']}
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
    getAll,
    createCart,
    createCartItems,
    update
}