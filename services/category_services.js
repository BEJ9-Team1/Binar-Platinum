const { Category } = require('../models')
const {BadRequestError, NotFoundError} = require('../errors/');

const lookup = async (payload) => {
    const {id} = payload
    const category = await Category.findOne({ where: { id: id } })
    if (!category) {
        throw new NotFoundError(`Invalid Category id = ${id}`);
    }
    return category  
}

const getAll = async (qParams) => {
    const category = await Category.findAndCountAll()
    return category
}


const createCategory = async (req, res) => {
    const { name } = req.body;
    const check = await Category.findOne({ where: { name: name } });
    if (check){
        throw new BadRequestError('Category has been added, you can update the quantity')
    } 

    const category = await Category.create({
        name
    });

    return category;

};


const update = async (CategoryId, payload) => {
    console.log(CategoryId);
    const result = await Category.update(payload, {
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
    update
    // updateMenu,
    // deleteMenu
}