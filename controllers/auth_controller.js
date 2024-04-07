const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models')
const {BadRequestError, UnauthorizedError} = require('../errors');


const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        let foundUser = ''
        //passing dataId for findOne service
        const findAdmin = await User.findOne({ where: { userName: userName } })
        foundUser = findAdmin
        //validate if foundUser is true
        if (foundUser) {
            //validate if password is true
            const isValidPassword = bcrypt.compareSync(password, foundUser.password);
            if (isValidPassword) {
                const payload = {
                    id: foundUser.id,
                    userName: foundUser.userName,
                    role: foundUser.role,
                    isActive : foundUser.isActive
                }
                //create token using payload
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
    //return response loggedout
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
    //create token from new payload
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED });
    return token
        
}
module.exports = {
    login,
    logout,
    refreshToken
}
