const router = require('express').Router();
const authController = require('../controllers/auth_controller')
const userController = require('../controllers/user_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

//AUTH//
router.post('/auth/register', userController.create) // {url}/user/register
router.post('/auth/login', authController.login)
router.post('/auth/logout', JWTAuth, authController.logout)

module.exports= router