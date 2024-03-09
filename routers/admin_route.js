const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const paymentController = require('../controllers/payment_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')


//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', JWTAuth, RoleGuard('admin'), categoryController.create)
router.patch('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', JWTAuth, RoleGuard('admin'), categoryController.destroy)
//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', JWTAuth, RoleGuard('admin'), paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.update)
router.delete('/payment/:id', JWTAuth, RoleGuard('admin'), paymentController.destroy)

module.exports= router