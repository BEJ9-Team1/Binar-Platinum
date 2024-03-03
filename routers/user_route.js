
const router = require('express').Router();
const userController = require('../controllers/user_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')
const {RoleGuard} = require('../middlewares/role-guard')

// USER CONTROLLER //
router.get('/user', JWTAuth, userController.index)
router.post('/user', userController.create)
router.get('/user/:email', JWTAuth, userController.find)
router.put('/user', JWTAuth, userController.update)
router.delete('/user/:id', JWTAuth, userController.destroy)


module.exports= router