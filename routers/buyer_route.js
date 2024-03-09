const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const cartController = require('../controllers/cart_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ORDER//

//CART//
router.post('/cart', JWTAuth, cartController.create);
router.get('/cart', cartController.index);
router.get('/cart/:id', cartController.findCartItems);
router.patch('/cart/:id', cartController.updateQty);

module.exports= router