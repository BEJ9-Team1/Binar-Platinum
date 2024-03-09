//BUYER && MERCHANT//
const router = require('express').Router();
const orderController = require('../controllers/order_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ORDER//
router.get('/order/:userId', orderController.index) //getAllOrder
router.get('/order/', orderController.crontab) //getAllOrder
router.post('/order', orderController.create)
router.get('/order/:userId/:id', orderController.find)
router.patch('/order/:userId/:id', orderController.update)
//router.delete('/order/:id', orderController.destroy)

module.exports= router