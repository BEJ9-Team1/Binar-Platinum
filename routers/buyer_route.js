const router = require('express').Router();
const userController = require('../controllers/user_controller')
const AddressController = require('../controllers/address_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//ORDER//

//CART//

module.exports= router