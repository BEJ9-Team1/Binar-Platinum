const { Category } = require('../models')

const lookup = async (payload) => {
    const category = await Category.findOne({ where: { name: payload } })
    return category  
}

const findById = async (id) => {
    const category = await Category.findByPk(id)
    return category
}

const getAll = async () => {
    const category = await Category.findAndCountAll(
        {
            order: [
                ['createdAt', 'DESC']
            ]
        }
    )
    return category
}


const createCategory = async (payload) => {
    const { ...category } = payload
    const createCategory = await Category.create({
        ...category
    });

    return createCategory;

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
    destroy,
    findById
}