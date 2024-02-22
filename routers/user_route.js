const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const userController = require('../controllers/user_controller')
// USER CONTROLLER //
router.get('/user', userController.index)
router.post('/user', userController.create)
router.get('/user/:email', userController.find)
router.patch('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)

//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)
router.patch('/category/:id', categoryController.update)
router.get('/category/:name', categoryController.find)
router.delete('/category/:id', categoryController.destroy)







module.exports = router 