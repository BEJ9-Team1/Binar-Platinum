const productServices = require('../services/productServices')
const cartServices = require('../services/cart_services')
const {createCartDTO, updateCartDTO} = require('../validators/cart_validator')
const {BadRequestError, NotFoundError} = require('../errors');
const { error } = require('../validators/address_validator');

const index = async (req, res, next) => {
    try {
        //passing getAll service
        const data = await cartServices.getAll(req.user.id)

        return res.status(200).json({
            status: 200,    
            message: 'Request Success',
            data: data
        })

    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
}

const findCartItems = async (req, res, next) => {
    try {
        //passing getAll service
        const result = await cartServices.lookup(req.params.id);
        res.status(200).json({
            data: result,
        });
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        //validate request body
        const cartDTO = await createCartDTO.validateAsync(req.body)

        const payload = {
            productId: cartDTO.productId,
            qty: cartDTO.qty,
        } 

        //passing lookupUserCart service
        const lookup = await cartServices.lookupUserCart(req.user.id);

        if (!lookup){
            // create cart first and create cartItems and store it into the cart
            try{
                const newCart = await cartServices.createCart(req.user.id);
                payload.cartId = newCart.id;
            }
            catch (err) {
                console.error(err);
                next(err);
            }
        }
        else{
            payload.cartId = lookup.id;
        }
        //passing createCartItems service
        const newCartItems = await cartServices.createCartItems(payload);
        
        res.status(200).json({
            message: "Success",
            payload: newCartItems.dataValues
        });
        
    } catch (err) {
        console.error(err);
        next(err);
    }
};


const updateQty = async (req, res, next) => {
    try {
        const cartDTO = await updateCartDTO.validateAsync(req.body)
        const cartItemId = req.params.id
        const lookup = await cartServices.lookup(cartItemId);
        if(!lookup){
            throw new NotFoundError("CartItems Id is not found!")
        }
        const newData = {
            qty: cartDTO.qty,
        }
        const result = await cartServices.update(cartItemId ,newData)
        res.status(200).json({
            message: "Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    findCartItems,
    create,
    updateQty
}