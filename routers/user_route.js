const router = require('express').Router();
const categoryController = require('../controllers/category_controller');
const ProductController = require('../controllers/productController');
// USER CONTROLLER //



//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', categoryController.destroy)

// PRODUCT //
router.get('/products', ProductController.index)
router.post('/products', ProductController.create)
router.get('/products/:id', ProductController.findById)
router.put('/products/:id', ProductController.update)
router.delete('/products/:id', ProductController.delete)







module.exports = router 