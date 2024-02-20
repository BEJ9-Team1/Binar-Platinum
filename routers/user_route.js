const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
// USER CONTROLLER //



//CATEGORY//
router.get('/category', categoryController.index)
router.post('/category', categoryController.create)




module.exports = router 