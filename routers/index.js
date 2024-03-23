const express = require("express");
const router = express.Router();
const authRoutes = require('./auth_route');
const buyerRoutes = require('./buyer_route')
const adminRoutes = require('./admin_route')
const sellerRoutes = require('./merchant_route')
const userRoute = require('./user_route')
const addressRoute = require('./address_route')
const imageRoute = require('./image_route')
const orderRoute = require('./order_route')
const mailerRoute = require('./mailer_route')


apiv1 = '/api/v1.0'

router.use(apiv1, authRoutes)
router.use(apiv1, buyerRoutes)
router.use(apiv1, adminRoutes)
router.use(apiv1,sellerRoutes)
router.use(apiv1, userRoute)
router.use(apiv1, addressRoute)
router.use(apiv1,orderRoute)
router.use(apiv1,imageRoute)
router.use(apiv1,mailerRoute)

module.exports = router;