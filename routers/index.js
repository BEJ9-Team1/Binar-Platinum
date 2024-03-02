const express = require("express");
const router = express.Router();
const authRoutes = require('./auth_route');
const buyerRoutes = require('./buyer_route')
const adminRoutes = require('./admin_route')
const sellerRoutes = require('./seller_route')



apiv1 = '/api/v1.0'

router.use(apiv1, authRoutes)
router.use(apiv1, buyerRoutes)
router.use(apiv1, adminRoutes)
router.use(apiv1,sellerRoutes)







module.exports = router;