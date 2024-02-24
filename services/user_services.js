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
    const { address, ...user } = payload
    const registerUser = await User.create({
        ...user,
        address: [
            ...address
        ]
    },
    {
        include: [
            'address'
        ]
    }
    );

    return registerUser;
}

const update = async (userId, newData) => {
    const { address, ...user} = newData
    const oldData = await lookup(userId)

    const updateUser = Object.assign(oldData, user)
    await updateUser.save();

    if(oldData){
        const updateAddress = Object.assign(oldData.address, address)
        await updateAddress.save();
    }

    const result = await User.update(newData, {
        where: {
            id: userId,
        },
        individualHooks: true
    })
    return updateUser.reload()

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