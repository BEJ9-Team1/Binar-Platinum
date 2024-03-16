const productServices = require('../services/productServices')
const categoryServices = require('../services/category_services')
const productValidator = require('../validators/productValidator')
const { NotFoundError } = require('../errors');


class ProductController {

    static index = async (req, res) => {

        try {

            const products = await productServices.getAll()

            return res.status(200).json({ message: 'success', payload: products })

        } catch (error) {

            return res.status(404).json({ message: 'failed', message: message })

        }

    }

    static findById = async (req, res, next) => {

        const id = +req.params.id
        let payload = {}

        try {

            const product = await productServices.findById(id)

            if (!product) throw new NotFoundError(`product with id ${id} not found`)

            return res.status(200).json({ message: 'success', payload: product })

        } catch (error) {

            next(error)

        }

    }

    static create = async (req, res, next) => {

        try {

            const productDTO = await productValidator.createProductDTO.validateAsync(req.body)

            const category = await categoryServices.lookup(req.body.category)

            if (!category) throw new NotFoundError(`category ${category} not found`)

            const payload = {
                name: productDTO.name,
                categoryId: category.id,
                merchantId: 1,
                description: productDTO.description,
                price: productDTO.price,
                stock: productDTO.stock
            }

            const product = await productServices.createProducts(payload)

            return res.status(201).json({ message: 'success', payload: product })

        } catch (error) {

            next(error)

        }

    }

    static update = async (req, res, next) => {

        const id = +req.params.id

        let message = ''

        try {

            const product = await productServices.findById(id)

            if (!product) throw new NotFoundError(`product with id ${id} not found`)

            const productDTO = await productValidator.updateProductDTO.validateAsync(req.body)

            const payload = {
                name: productDTO.name ?? product.dataValues.name,
                description: productDTO.description ?? product.dataValues.description,
                price: productDTO.price ?? product.dataValues.price,
                stock: productDTO.stock ?? product.dataValues.stock
            }

            await productServices.updateProduct(id, payload)

            return res.status(200).json({ message: 'success', payload: payload })

        } catch (error) {

            next(error)

        }

    }

    static delete = async (req, res, next) => {

        const id = +req.params.id

        try {

            const productDelete = await productServices.deleteProduct(id)

            if (productDelete == 0) throw new NotFoundError('no product was deleted')

            return res.status(200).json({ message: 'success', payload: null })

        } catch (error) {

            next(error)

        }

    }

}

module.exports = ProductController