const { UnauthorizedError } = require('../errors')

// Middleware for role validation
const RoleGuard = (requiredRole1, requiredRole2) => {
  return (req, res, next) => {

    try {
      userData = req.user
      const userRole = userData.role;

      if (req.user.isActive && userRole === requiredRole1) {
        next()
      } else if (req.user.isActive && userRole === requiredRole2) {
        next()
      }
      
      // let count = 0
      // if(req.user.isActive===true) count++
      //   if (userRole === requiredRole1 && count >= 0) {
      //     next(); // User has the required role, proceed to the next middleware or route handler
      //   } else if (userRole === requiredRole2 && count >= 0) {
      //     next()
      //   } 


      else throw new UnauthorizedError("Access Forbidden") // User does not have the required role  

    } catch (err) {
      next(err)
    }
  };
};

module.exports = {
  RoleGuard
}