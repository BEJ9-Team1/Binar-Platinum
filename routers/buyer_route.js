const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ADDRESS//
router.get('/buyer/address', AddressController.index)
router.post('/buyer/address', JWTAuth, RoleGuard('buyer'), AddressController.create)
router.get('/buyer/address/:id', JWTAuth, RoleGuard('buyer'),AddressController.find)
router.put('/buyer/address/:id', JWTAuth, RoleGuard('buyer'), AddressController.update)
router.delete('/buyer/address/:id', JWTAuth, RoleGuard('buyer'), AddressController.destroy)

// USER CONTROLLER //
router.get('/buyer', JWTAuth, RoleGuard('buyer'), userController.index)
router.post('/buyer', userController.create)
router.get('/buyer/:email', JWTAuth, RoleGuard('buyer'), userController.find)
router.put('/buyer/:id', JWTAuth, RoleGuard('buyer'), userController.update)
router.delete('/buyer/:id', JWTAuth, RoleGuard('buyer'), userController.destroy)

//ORDER//

//CART//

//IMAGE//

module.exports= router