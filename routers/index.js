const express = require("express");
const router = express.Router();
// const authRoutes = require('./auth_routes');
const userRoutes = require('./user_route');
const authRoutes = require('./auth_route');
const { JwtGuard } = require('../middlewares/auth-jwt')

// const adminRoutes = require('./admin_routes');

router.use("/auth", authRoutes);
router.use("/user", JwtGuard, userRoutes);


module.exports = router;