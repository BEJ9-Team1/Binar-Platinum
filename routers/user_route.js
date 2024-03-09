
const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const mediaController = require('../controllers/media_controller');
const { upload } = require('../services/media_services');
const userController = require('../controllers/user_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

// USER CONTROLLER //
router.get('/user', JWTAuth, userController.index)
router.post('/user', userController.create)
router.get('/user/:email', userController.find)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)

//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', categoryController.destroy)


//MEDIA
router.get('/media',mediaController.index)
router.get('/media/:id',mediaController.find)
router.post('/media',upload.single("picture"),mediaController.create)
router.put('/media/:id',upload.single("picture"),mediaController.updateImage)
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

//PAYMENT//
router.get('/payment', paymentController.index)
router.post('/payment', paymentController.create)
router.get('/payment/:name', paymentController.find)
router.put('/payment/:id', paymentController.update)
router.delete('/payment/:id', paymentController.destroy)




module.exports = router 