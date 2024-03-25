const { UnauthorizedError } = require('../errors')

// Middleware for role validation
const RoleGuard = (requiredRole1, requiredRole2) => {
  return (req, res, next) => {

      try {
        userData = req.user
        const userRole = userData.role;
        
        if (userRole === requiredRole1 && req.user.isActive) {
          next(); // User has the required role, proceed to the next middleware or route handler
        } else if (userRole === requiredRole2 && req.user.isActive) {
          next()
        } 


      else throw new UnauthorizedError("Access Forbidden") // User does not have the required role  

    } catch (err) {
      next(err)
    }
  };
};

module.exports = {
  RoleGuard
}