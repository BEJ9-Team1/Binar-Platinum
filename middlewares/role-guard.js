const {UnauthorizedError} = require('../errors')

// Middleware for role validation
const RoleGuard = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (userRole === requiredRole) {
        next(); // User has the required role, proceed to the next middleware or route handler
      } else {
        throw new UnauthorizedError("Access Forbidden") // User does not have the required role
      }
    };
  };

module.exports = {
    RoleGuard
}