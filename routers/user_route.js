
const router = require('express').Router();
const userController = require('../controllers/user_controller')
const  {JWTAuth} = require('../middlewares/auth-jwt')

// USER CONTROLLER //
router.get('/user', JWTAuth, userController.index)
router.post('/user', userController.create)
router.get('/user/:email', userController.find)
router.put('/user/:id',JWTAuth, userController.update)
router.delete('/user/:id', userController.destroy)



module.exports = router 