const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')

//ADDRESS//
router.get('/address',JWTAuth, AddressController.index)
router.post('/address', AddressController.create)
router.get('/address/:id', AddressController.find)
router.put('/address/:id', AddressController.update)
router.delete('/address/:id', AddressController.destroy)

// USER CONTROLLER //
router.get('/user', userController.index)
router.post('/user', userController.create)
router.get('/user/:email', userController.find)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.destroy)


//ORDER//

//CART//

//IMAGE//

module.exports= router