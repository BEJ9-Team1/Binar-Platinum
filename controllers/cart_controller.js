const productServices = require('../services/productServices')
const cartServices = require('../services/cart_services')
const {createCartDTO, updateCartDTO} = require('../validators/cart_validator')
const {BadRequestError, NotFoundError} = require('../errors');

const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await cartServices.getAll(params)

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
        const cartDTO = await createCartDTO.validateAsync(req.body)

        const payload = {
            cartId: req.body.cartId,
            productId: cartDTO.productId,
            QTY: cartDTO.qty,
        } 

        if (!payload.cartId){
            // create cart first and create cartItems and store it into the cart

            currentUserId = 1; // cara dapetin id user yang sedang login sekarang?
            try{
                const newCart = await cartServices.createCart(currentUserId);
            }
            catch (err) {
                console.error(err);
                next(err);
            }
            payload.cartId = newCart.id;
        }

        const newCartItems = await cartServices.createCartItems(payload);
        
        res.status(StatusCodes.CREATED).json({
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