const router = require('express').Router();
const userController = require('../controllers/user_controller')
const ProductController = require('../controllers/productController');
const AddressController = require('../controllers/address_controller')
const  JWTGUARD = require('../middlewares/auth-jwt')

// PRODUCT //
router.get('/products', ProductController.index)
router.post('/products', ProductController.create)
router.get('/products/:id', ProductController.findById)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)

//ADDRESS//
router.get('/address', AddressController.index)
router.post('/address', AddressController.create)
router.get('/address/:id', AddressController.find)
router.put('/address/:id', AddressController.update)
router.delete('/address/:id', AddressController.destroy)

// USER CONTROLLER //
router.get('/user', userController.index)
router.post('/user', userController.create)
router.get('/user/:email', userController.find)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)

//IMAGE//

module.exports= router