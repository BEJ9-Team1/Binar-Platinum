const { User } = require('../models')
const {BadRequestError, NotFoundError} = require('../errors/');

const lookup = async (payload) => {
    const {id} = payload 
    const user = await User.findOne({ where: {id: id } })
    if (!user) {
        throw new NotFoundError(`${id} not found`);
    }
    return user  
}

const getAll = async (qParams) => {
    const user = await User.findAndCountAll({where : {isDeleted:false}})
    return user
}


const createUser = async (req, res) => {
    const { username, name, password, confirmPassword,} = req.body;
    const check = await User.findOne({ where: { username: username } });
    if (check){
        throw new BadRequestError('Username has been used')
    } else if(password !== confirmPassword){
        throw new BadRequestError('Password NOT Match With Confirm Password')
    };
  
    const users = await User.create({
        username,
        name,
        password,
    });

    return users;
};

const update = async (userId, payload) => {
    const result = await User.update(payload, {
        where: {
            id: userId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (id) => {
    const deleteuser = await User.destroy({
        where: {
            id: id
        },
        individualHooks: true
    })
    return deleteuser
}

module.exports = {
    lookup,
    getAll,
    createUser,
    update,
    destroy
    // updateMenu,
    // deleteMenu
}