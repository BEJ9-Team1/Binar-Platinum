const sequelize = require('sequelize')
const { User, Address, Media } = require('../models')

const getOne = async (userId) => {
    const user = await User.findAndCountAll(
        {
            attributes: ['id', 'userName', 'email','phoneNumber', 'firstName', 'lastName', 'role'],
            where: {id: userId},
            include:[{
                model:Media,
                as:"UserImage",
                attributes:['url']
            }]
        }
        )
    return user
}

const lookup = async (userId) => {
    const checkUser = await User.findByPk(userId,
    {
        include: 'address',
        attributes: ['id', 'userName', 'email','phoneNumber', 'firstName', 'lastName', 'role'],
    })
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

    console.log('USER ==> ', registerUser);

    return registerUser;
   
}

const update = async (oldAddress, oldData, newData) => {
    const {address, ...user} = newData

    const updateUser = Object.assign(oldData, user)
    await updateUser.save()

        // // First try to find the record
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

    return await updateUser.reload({include: 'address',  attributes: ['id', 'userName', 'email','phoneNumber', 'firstName', 'lastName', 'role']} )
   
};

const updateRole = async (userId, newData) => {
    const updateRole = await User.update(newData,{
        where: {id: userId},
        role: newData
    })
    return updateRole
   
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
    getOne,
    emailIsExists,
    lookup,
    registerUser,
    updateRole,
    update,
    destroy
}