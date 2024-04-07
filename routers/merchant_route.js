const router = require('express').Router();
const productController = require('../controllers/productController');
const merchantController = require('../controllers/merchant_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//MERCHANT//
router.get('/merchant', merchantController.index)
router.post('/merchant', JWTAuth, RoleGuard('buyer', 'merchant'), merchantController.create)
router.get('/merchant/:name', merchantController.find)
router.put('/merchant/', JWTAuth, RoleGuard('merchant'), merchantController.update)

// PRODUCT //
router.get('/products', productController.index)
router.get('/products/search', productController.search)
router.post('/products', JWTAuth, RoleGuard('merchant'), productController.create)
router.get('/products/:id', productController.findOne)
router.put('/products/:id', JWTAuth, RoleGuard('merchant'), productController.update)
router.delete('/products/:id', JWTAuth, RoleGuard('merchant'), productController.deleteProduct)



module.exports= router