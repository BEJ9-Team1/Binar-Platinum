const router = require('express').Router();
const userController = require("../controllers/user_controller")
const authController = require('../controllers/auth_controller')
const { JwtGuard } = require('../middlewares/auth-jwt')



//USER//
router.get('/', userController.index)  // {url}/user
router.get('/:id', JwtGuard, userController.find)
router.patch('/updateUser/:id', JwtGuard, userController.update)
// router.delete('/deleteUser/:id', userController.destroy)



//AUTH//
router.post('/register', userController.create) // {url}/user/register
router.post('/login', authController.login)


module.exports= router