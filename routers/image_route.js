const router = require('express').Router();
const mediaController = require('../controllers/media_controller');
const { upload } = require('../services/media_services');
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//MEDIA
router.get('/media', mediaController.index)
router.get('/media/:id',mediaController.find)
router.post('/media/user', JWTAuth, RoleGuard('buyer',"merchant"), upload.single("picture"),mediaController.createUser)
router.post('/media/product/:id',JWTAuth, RoleGuard('merchant'), upload.single("picture"),mediaController.createProduct)
router.put('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'), upload.single("picture"),mediaController.updateImage)
router.delete('/media/:id', JWTAuth, RoleGuard('buyer', 'merchant'),mediaController.destroy)

module.exports= router