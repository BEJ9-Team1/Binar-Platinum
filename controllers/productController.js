const { Product, Category } = require('../models')
const productServices = require('../services/productServices')
const productValidator = require('../validators/productValidator')
const { Op } = require("sequelize");


class ProductController {

    static index = async (req, res) => {

        let message = ''
        let payload = {}

        try {

            const products = await productServices.getAll()

            if (!products) {
                message = 'no products found'
                throw error
            }

            payload.dataProducts = products

            return res.status(200).json({ responseMessage: 'success', payload: payload })

        } catch (error) {

            console.log('Error Occur On ==> ', error)
            return res.status(404).json({ responseMessage: 'failed', message: message })

        }

    }

    static findById = async (req, res) => {

        const id = +req.params.id
        let message = ''
        let payload = {}

        try {

            const product = await productServices.findById(id)

            if (!product) {
                message = `product with id ${id} not found`
                throw error
            }

            payload.dataProduct = product

            return res.status(200).json({ responseMessage: 'success', payload: payload })

        } catch (error) {

            responseMessage = 'failed'
            return res.status(404).json({ responseMessage: 'failed', message: message ?? error })

        }

    }

    static create = async (req, res) => {

        let message = ''

        try {

            const productDTO = await productValidator.createProductDTO.validateAsync(req.body)

            const payload = {
                name: productDTO.name,
                categoryId: productDTO.categoryId,
                merchantId: 1,
                description: productDTO.description,
                price: productDTO.price,
                stock: productDTO.stock
            }

            const category = await Category.findByPk(payload.categoryId)

            if (!category) {
                message = `category with id ${payload.categoryId} is not available`
                throw error
            }

            await Product.create(payload)

            return res.status(201).json({ responseMessage: 'success', payload: payload })

        } catch (error) {

            console.log("Error is occured here ==> ", error)

            return res.status(400).json({ responseMessage: 'failed', message: message || error.details[0].message })

        }

    }

    static update = async (req, res) => {

        const id = +req.params.id

        let message = ''

        try {

            const product = await Product.findByPk(id)

            if (!product) {
                return res.status(404).json({ responseMessage: 'failed', message: `product with id ${id} not found` })
            }

            const productDTO = await productValidator.updateProductDTO.validateAsync(req.body)

            const payload = {
                name: productDTO.name ?? product.dataValues.name,
                description: productDTO.description ?? product.dataValues.description,
                price: productDTO.price ?? product.dataValues.price,
                stock: productDTO.stock ?? product.dataValues.stock
            }

            await productServices.updateProduct(id, payload)

            return res.status(200).json({ responseMessage: 'success', payload: payload })

        } catch (error) {

            console.log("Error is here ==>> ", error);
            return res.status(400).json({ responseMessage: 'failed', message: message || error.details[0].message })

        }

    }

    static delete = async (req, res) => {

        const id = +req.params.id

        let message = ''

        try {

            const productDelete = await productServices.deleteProduct(id)

            console.log("product delete ==> ", productDelete)

            if (productDelete == 0) {
                message = 'no product was deleted'
                throw error
            }

            return res.status(200).json({ responseMessage: 'success', payload: null })

        } catch (error) {

            return res.status(400).json({ responseMessage: 'failed', message: message ?? error })

        }

    }

}

module.exports = ProductController