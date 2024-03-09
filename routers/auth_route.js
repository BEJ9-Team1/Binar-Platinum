const router = require('express').Router();
const authController = require('../controllers/auth_controller')
const userController = require('../controllers/user_controller')

//AUTH//
router.post('/auth/register', userController.create) // {url}/user/register
router.post('/auth/login', authController.login)


module.exports= router