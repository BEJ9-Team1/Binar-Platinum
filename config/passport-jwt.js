const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");

const options = {
    secretOrKey: process.env.JWT_SECRET_KEY,
    // jwtFromRequest: ExtractJwt.fromHeader("authorization")
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

function decode(payload, done) {

    // if (payload.iat) {
    //     done("Session Ended", null)
    // } else {
    //     done(null, payload);
    // }
    done(null, payload);


}

passport.use(new JWTStrategy(options, decode));

module.exports = passport;