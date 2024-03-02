const router = require('express').Router();
const userController = require('../controllers/user_controller')
const ProductController = require('../controllers/productController');
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

// PRODUCT //
router.get('/merchant/products', ProductController.index)
router.post('/merchant/products', JWTAuth, RoleGuard('merchant'), ProductController.create)
router.get('/merchant/products/:id', ProductController.findById)
router.put('/merchant/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.update)
router.delete('/merchant/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.delete)

//ADDRESS//
router.get('/merchant/address', AddressController.index)
router.post('/merchant/address', JWTAuth, RoleGuard('merchant'), AddressController.create)
router.get('/merchant/address/:id', AddressController.find)
router.put('/merchant/address/:id', JWTAuth, RoleGuard('merchant'), AddressController.update)
router.delete('/merchant/address/:id', JWTAuth, RoleGuard('merchant'), AddressController.destroy)

// USER CONTROLLER //
router.get('/merchant', JWTAuth, RoleGuard('merchant'), userController.index)
router.post('/merchant', JWTAuth, RoleGuard('merchant'), userController.create)
router.get('/merchant/:email', JWTAuth, RoleGuard('merchant'), userController.find)
router.put('/merchant/:id', JWTAuth, RoleGuard('merchant'), userController.update)
router.delete('/merchant/:id', JWTAuth, RoleGuard('merchant'), userController.destroy)

//IMAGE//

module.exports= router