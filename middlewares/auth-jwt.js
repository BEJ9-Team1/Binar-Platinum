const passport = require("../config/passport-jwt");
const {BadRequestError} = require('../errors')

const JWTAuth = passport.authenticate("jwt", {
    session: false,
}
);


module.exports = { JWTAuth, authorization };
