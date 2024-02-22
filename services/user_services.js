const { User } = require('../models')

const getAll = async (qParams) => {
    const user = await User.findAndCountAll()
    return user
}

const lookup = async (payload) => {
    const email = payload
    const user = await User.findOne({ where: { email: email } })
    return user  
}

const registerUser = async (payload) => {
    const { ...user } = payload
    const registerUser = await User.create({
        ...user
    });

    return registerUser;
}

const update = async (userId, payload) => {
    const result = await User.update(payload, {
        where: {
            id: userId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (userId) => {
    const result = await User.destroy({
        where: {
            id: userId,
        },
        individualHooks: true
    })
    return result
};

module.exports = {
    getAll,
    lookup,
    registerUser,
    update,
    destroy
}