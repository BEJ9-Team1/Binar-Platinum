const router = require('express').Router();
const AddressController = require('../controllers/address_controller')

// USER CONTROLLER //

// ADDERSS //
router.get('/address', AddressController.index)
router.post('/address', AddressController.create)
router.get('/address/:id', AddressController.find)
router.put('/address/:id', AddressController.update)
router.delete('/address/:id', AddressController.destroy)

module.exports = router 