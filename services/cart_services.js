const { Cart, CartItem } = require('../models')

const lookup = async (cartId) => {
    const cartItem = await CartItem.findAll( 
        { 
            where: { cartId: cartId },
        }        
     )
    return cartItem  
}


const getAll = async (qParams) => {
    const cart = await Cart.findAndCountAll(
        // {
        //     include: [{ model: CartItem, as: 'Cart Items' }]
        // }
    )
    return cart
}

const createCart = async (payload) => {
    const { ...cart } = payload
    const registerCart = await Cart.create({
        ...cart,
    },
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