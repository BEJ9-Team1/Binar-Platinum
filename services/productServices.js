const { Product, Category, Media} = require('../models')

const getAll = async () => {
    const products = await Product.findAndCountAll({
        attributes: ['id', 'name', 'merchantId', 'price'],
        include:[{
            model: Category,
            as: 'category',
            attributes: ['name']
        },
        {
            model:Media,
            as:"ProductImage",
            attributes:['url']
        }
        ]
    })

    return products
}

const search = async (params) => {
    const products = await Product.findAndCountAll({
        attributes: ['id', 'name', 'merchantId', 'price'],
        where: {id: params},
        include:[{
            model: Category,
            as: 'category',
            attributes: ['name']
        },
        {
            model:Media,
            as:"ProductImage",
            attributes:['url']
        }
        ]
    })

    return products
}

const findById = async (productId) => {
    const product = await Product.findByPk(productId,
        {
            attributes: ['name', 'price', 'description', 'stock', 'merchantId'],
            include:[{
                model: Category,
                as: 'category',
                attributes: ['name']
            },
            {
                model:Media,
                as:"ProductImage",
                attributes:['url']
            }
            ]
        })

    return product
}

const createProducts = async (payload) => {

    const { ...product } = payload

    const createProduct = await Product.create(
        {
            ...product
        })

    return createProduct
}

const updateProduct = async (productId, payload,t) => {
    
    const { ...product } = payload

    const updateProduct = await Product.update(
        { ...product },
        {
            where: {
                id: productId
            },
            transaction: t
        }
        )
        return updateProduct
}

const deleteProduct =async(productId) => {
    const deleteProduct = await Product.destroy({
        where: {
            id: productId
        }
    })

    return deleteProduct
}

module.exports = {
    getAll,
    findById,
    createProducts,
    updateProduct,
    deleteProduct,
    search
}