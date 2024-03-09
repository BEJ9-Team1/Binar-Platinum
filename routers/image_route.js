const router = require('express').Router();
const mediaController = require('../controllers/media_controller');
const { upload } = require('../services/media_services');


//MEDIA
router.get('/media',mediaController.index)
router.get('/media/:id',mediaController.find)
router.post('/media',upload.single("picture"),mediaController.create)
router.put('/media/:id',upload.single("picture"),mediaController.updateImage)


module.exports= router