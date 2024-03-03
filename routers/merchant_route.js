const router = require('express').Router();
const userController = require('../controllers/user_controller')
const ProductController = require('../controllers/productController');
const merchantController = require('../controllers/merchant_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')


//MERCHANT//
router.get('/merchant', merchantController.index)
router.post('/merchant', JWTAuth, RoleGuard('buyer'), merchantController.create)



// PRODUCT //
router.get('/products', ProductController.index)
router.post('/products', JWTAuth, RoleGuard('merchant'), ProductController.create)
router.get('/products/:id', ProductController.findById)
router.put('/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.update)
router.delete('/products/:id', JWTAuth, RoleGuard('merchant'), ProductController.delete)



module.exports= router