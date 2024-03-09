const router = require('express').Router();
const categoryController = require('../controllers/category_controller')
const mediaController = require('../controllers/media_controller');
const { upload } = require('../services/media_services');
// USER CONTROLLER //



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

module.exports = router 