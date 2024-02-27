const sequelize = require('sequelize')
const { User, Address } = require('../models')

const getAll = async (qParams) => {
    const user = await User.findAndCountAll()
    return user
}

const lookup = async (userId) => {
    const checkUser = await User.findByPk(userId,
        {include: 'address'})
    return checkUser
}

const emailIsExists = async (emailUser) => {
    const user = await User.findOne(
        { where: { email: emailUser },
        include: [{ model: Address, as: 'address' }]
    }        
    )
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

const update = async (oldAddress, oldData, newData) => {
    const { address, ...user} = newData

    const updateUser = Object.assign(oldData, user)
    await updateUser.save()

        // First try to find the record
        for(let i = 0; i < address.length; i++){
            if(i < oldAddress.length){
            await Address.update(address[i],
                    {
                        where: {id: oldAddress[i].id}
                    }
                    )
            }else {
            const addNewAddress = await Address.create(address[i])
            await updateUser.addAddress(addNewAddress)
            }
        }

    return await updateUser.reload({include: 'address'})
   
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
    emailIsExists,
    lookup,
    registerUser,
    update,
    destroy
}