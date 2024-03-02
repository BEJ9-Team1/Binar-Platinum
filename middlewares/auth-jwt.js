const passport = require("../config/passport-jwt");
const {BadRequestError} = require('../errors')

const JWTAuth = passport.authenticate("jwt", {
    session: false,
}
);


function authorization(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Please login first" });
    } else {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: "You are not and Admin" });
        }
    }
}

module.exports = { JWTAuth, authorization };
