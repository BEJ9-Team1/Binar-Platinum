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



module.exports= router