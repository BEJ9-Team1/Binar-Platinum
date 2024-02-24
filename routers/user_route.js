const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const paymentController = require('../controllers/payment_controller')
const AddressController = require('../controllers/address_controller')

// USER CONTROLLER //



//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', categoryController.destroy)

//ADDRESS//
router.get('/address', AddressController.index)
router.post('/address', AddressController.create)
router.get('/address/:id', AddressController.find)
router.put('/address/:id', AddressController.update)
router.delete('/address/:id', AddressController.destroy)

//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', paymentController.update)
router.delete('/payment/:id', paymentController.destroy)




module.exports = router 