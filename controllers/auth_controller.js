const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {NotFoundError, UnauthorizedError} = require('../errors')
const { User } = require('../models');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const findAdmin = await User.findOne({ where: { username: username } })

        if (findAdmin) {
            const isValidPassword = bcrypt.compareSync(password, findAdmin.password);
            if (isValidPassword) {
                const payload = {
                    id: findAdmin.id,
                    username: findAdmin.username,
                }
            if(findAdmin.isDeleted) throw new UnauthorizedError(`User ${findAdmin.username} has been deleted at ${findAdmin.updatedAt}`)  
                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
                return res.status(200).json({
                    token: token
                })
            } else {
                throw new NotFoundError('Wrong email or password')
            } 

        } else {
            throw new NotFoundError('Wrong email or password')
        }

    } catch (error) {
        next({status: 400, message: error.message, data: {}})
    }

}


module.exports = {
    login
}