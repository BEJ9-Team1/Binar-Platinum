const router = require('express').Router();
const itemController = require('../controllers/item_controller')
const sellerController = require('../controllers/seller_controller')
const orderController = require('../controllers/order_controller')
const shipmentContoller = require('../controllers/shipment_controller')
const userController = require('../controllers/user_controller')
// USER CONTROLLER //



//HISTORY//
router.get('/history', userController.findHistory) // {url}/user/items


//ITEM//
router.get('/items', itemController.index) // {url}/user/items
router.get('/items/:id', itemController.find)
router.post('/items', itemController.create) // {url}/user/items
router.patch('/items/updateItem/:id', itemController.update)
// router.delete('/items/:id', itemController.destroy)


//SELLER//
router.get('/sellers', sellerController.index) // {url}/user/sellers
router.get('/sellers/:id', sellerController.find) // {url}/user/sellers
router.post('/sellers', sellerController.create) // {url}/user/sellers
router.patch('/sellers/updateSeller/:id', sellerController.update)
router.delete('/sellers/:id', sellerController.destroy)


//SHIPMENT//
router.get('/shipment', shipmentContoller.index) // {url}/user/shipment
router.get('/shipment/:id', shipmentContoller.find) // {url}/user/shipment
router.post('/shipment', shipmentContoller.create) // {url}/user/shipment
router.patch('/shipment/updateShipment/:id', shipmentContoller.update)
// router.delete('/shipment/:id', shipmentContoller.destroy)


//ORDER//
router.get('/orders', orderController.index)
router.get('/orders/:id', orderController.find)
router.post('/orders', orderController.create)
router.patch('/orders/status/:id', orderController.update)
router.delete('/orders/:id', orderController.destroy)




module.exports = router 