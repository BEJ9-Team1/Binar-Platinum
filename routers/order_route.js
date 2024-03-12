//BUYER && MERCHANT//
const router = require('express').Router();
const orderController = require('../controllers/order_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ORDER//
router.get('/order/', JWTAuth, RoleGuard('buyer', 'seller'), orderController.index) //getAllOrder
router.post('/order',JWTAuth, RoleGuard('buyer'), orderController.create)
router.get('/order/:id',JWTAuth, RoleGuard('buyer', 'seller'), orderController.find)
router.patch('/order/:id',JWTAuth, RoleGuard('buyer', 'seller'), orderController.update)
//router.delete('/order/:id', orderController.destroy)

module.exports= router