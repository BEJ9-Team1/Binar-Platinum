const jwt = require("jsonwebtoken");
const {NotFoundError, UnauthorizedError} = require('../errors');
const { TableHints } = require("sequelize");


const JwtGuard = async (req, res, next) => {
    // Get token value to the json body
    let token = undefined
    // If the token is present
    try {
        token = req.headers.authorization.split(' ')[1];
        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // if (decode.role != 1) throw new Error('User not permitted')
        console.log(decode);
        //  Return response with decode data
        req.user = decode
        next()

    } catch (error) {
        // Return response with error)
        next({status: 403, message: error.message, data: {}})
    }
}

const decodeJWT = async (tokenJWT) => {
        // Verify the token using jwt.verify method
    const decode = jwt.verify(tokenJWT, process.env.JWT_SECRET_KEY)

    if(!decode) throw new NotFoundError('user not found')

    return decode
};

module.exports = {
    JwtGuard,
    decodeJWT
}