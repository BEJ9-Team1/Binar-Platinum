const passport = require("../config/passport-jwt");

const JWTAuth = passport.authenticate("jwt", {
    session: false,
}
);


module.exports = { JWTAuth };
