const express = require("express");
const router = express.Router();
// const authRoutes = require('./auth_routes');
const userRoutes = require('./user_route');
// const authRoutes = require('./auth_route');
// const { JwtGuard } = require('../middlewares/auth-jwt')

// const adminRoutes = require('./admin_routes');

// router.use("/auth", authRoutes);
app = '/api/v1.0'
router.use(app, userRoutes);


module.exports = router;