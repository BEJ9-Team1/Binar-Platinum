const router = require('express').Router();
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ADDRESS MERCHANT & BUYER//
router.get('/address',JWTAuth, AddressController.index)
router.get('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'),AddressController.find)
router.delete('/address/:id', JWTAuth, RoleGuard('buyer', 'merchant'), AddressController.destroy)


module.exports= router