const sequelize = require('sequelize')
const { User, Address } = require('../models')

const getAll = async (qParams) => {
    const user = await User.findAndCountAll()
    return user
}

const lookup = async (userId) => {
    const checkUser = await User.findByPk(userId)
    return checkUser
}

const emailIsExists = async (emailUser) => {
    const user = await User.findOne(
        { where: { email: emailUser },
        include: [{ model: Address, as: 'address' }]
    }        
    )
    return user ? true : false
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

    //   const creatUser = await User.create({
    //     ...user
    //   })

    //   for(let i = 0 ; i < address.length; i++){
    //     address.userId[i] = creatUser.id
    //   }
    //   const createAddress = await Address.bulkCreate(address)

    //   return {...creatUser, address: createAddress}
    
   
}

const update = async (userId, oldData, newData) => {
    const { address, ...user} = newData
    // oldData.user = user
    // await oldData.user.save()
    // oldData.address = address
    // await oldData.address.save
    // const updateData = {
    //     newData :{
    //         ...user
    //     },
    //     address: [
    //         ...address
    //     ]
    // }
    // const checkUser = await User.findOne(
    //     { where: { id: userId },
    //     include: [ 'address']
    // }     
    // );

    const updateUser = Object.assign(oldData, user)
    await updateUser.save()

    const deleteAddress = await Address.destroy(
        {
            where : {userId: userId}
        }
    )

    const recreateAddress = await Address.bulkCreate(
       address
       )
        
    await updateUser.addAddress(recreateAddress)
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