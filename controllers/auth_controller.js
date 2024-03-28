const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models')
const {BadRequestError, UnauthorizedError} = require('../errors');


const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        let foundUser = ''

        const findAdmin = await User.findOne({ where: { userName: userName } })
        foundUser = findAdmin

        if (foundUser) {
            const isValidPassword = bcrypt.compareSync(password, foundUser.password);
            if (isValidPassword) {
                const payload = {
                    id: foundUser.id,
                    userName: foundUser.userName,
                    role: foundUser.role,
                    isActive : foundUser.isActive
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED });
                return res.status(200).json({
                    token: token
                })
            } else {
                throw new BadRequestError('Wrong email or password')
            } 

        } else {
            throw new BadRequestError('Wrong email or password')
        }

    } catch (error) {
        next({status: 400, message: error.message, data: {}})
    }

}

const logout = async (req, res, next) => {
    try {
    return res.status(200).json({
        message: `logged out at ${Date.now()}`
    })
    } catch (error) {
        next(error)
    }

}

const refreshToken = async (userId, userName, role, isActive) => {
    const payload = {
        id: userId,
        userName: userName,
        role: role,
        isActive : isActive
    }
    console.log(payload, "auh CONTROLLEERRRR");
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED });
        return token
        
}
module.exports = {
    login,
    logout,
    refreshToken
}
