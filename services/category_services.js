const { Category } = require('../models')

const lookup = async (payload) => {
    const name = payload
    const category = await Category.findOne({ where: { name: name } })
    return category  
}

const getAll = async (qParams) => {
    const category = await Category.findAndCountAll()
    return category
}


const createCategory = async (payload) => {
    const category = await Category.create({
        name: payload
    });

    return category;

};


const update = async (CategoryId, payload) => {
    const result = await Category.update(payload, {
        where: {
            id: CategoryId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (CategoryId) => {
    const result = await Category.destroy({
        where: {
            id: CategoryId,
        },
        individualHooks: true
    })
    return result
};


module.exports = {
    lookup,
    getAll,
    createCategory,
    update,
    destroy
    // updateMenu,
    // deleteMenu
}