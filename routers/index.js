const express = require("express");
const router = express.Router();
// const authRoutes = require('./auth_routes');
const userRoutes = require('./user_route');
// const authRoutes = require('./auth_route');
// const { JwtGuard } = require('../middlewares/auth-jwt')

// const adminRoutes = require('./admin_routes');

// router.use("/auth", authRoutes);
apiv1 = '/api/v1.0'
router.use(apiv1, userRoutes);


module.exports = router;