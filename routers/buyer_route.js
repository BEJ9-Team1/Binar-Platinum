const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const cartController = require('../controllers/cart_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ORDER//

//CART//
router.post('/cart', JWTAuth, RoleGuard('buyer'), cartController.create);
router.get('/cart', JWTAuth, RoleGuard('buyer'), cartController.index);
router.get('/cart/:id', JWTAuth, RoleGuard('buyer'), cartController.findCartItems);
router.patch('/cart/:id', JWTAuth, RoleGuard('buyer'),cartController.updateQty);

module.exports= router