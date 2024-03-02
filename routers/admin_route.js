const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const paymentController = require('../controllers/payment_controller')
const  JWTGUARD = require('../middlewares/auth-jwt')

//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', categoryController.destroy)
//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', paymentController.update)
router.delete('/payment/:id', paymentController.destroy)

module.exports= router