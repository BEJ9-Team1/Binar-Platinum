const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ADDRESS MERCHANT & BUYER//
router.get('/address', AddressController.index)
router.post('/address', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.create)
router.get('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'),AddressController.find)
router.put('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.update)
router.delete('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.destroy)


module.exports= router