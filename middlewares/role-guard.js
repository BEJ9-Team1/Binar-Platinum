const {UnauthorizedError} = require('../errors')

// Middleware for role validation
const RoleGuard = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role;
      console.log(req.user);
      console.log(req.user.role, "USER ROLE");
      console.log(requiredRole, "REQUIRED ROLE");
  
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