const { Product } = require('../models')

class ProductController {

    static index = async (req, res) => {

        let statusCode = 200
        let status = 'success'
        let message = ''

        try {

            const products = await Product.findAll({
                attributes: ['name', 'price']
            })

            if (!products) {
                statusCode = 404
                status = 'failed'
                message = 'no products found'
            }

            return res.status(200).json({ status: 'status', payload: products })

        } catch (error) {

            console.log('ada error ==> ', error)

            return res.status(statusCode).json({ status: status, message: message })

        }

    }

    static findById = async (req, res) => {

        const id = +req.params.id
        let statusCode = 200
        let status = 'success'
        let message = ''

        try {

            // const product = await Product.findOne({
            //     where: {
            //         id: id
            //     },
            //     attributes: ['name', 'price', 'description', 'qty']
            // })

            const product = await Product.findByPk(id, {
                attributes : ['name', 'price', 'description', 'stock', 'merchantId']
            })

            if (!product) {
                statusCode = 404
                message = `product with id ${id} not found`
                throw error
            }

            return res.status(200).json({ status: 'success', payload: product })

        } catch (error) {

            status = 'failed'
            return res.status(statusCode).json({status: status, message: message ?? error.message})

        }

    }

    static create = async (req, res) => {

        const { name, categoryId, merchantId, description, price, stock } = req.body

        try {

            const payload = {
                name: name ?? '',
                categoryId: categoryId ?? '',
                merchantId: merchantId ?? '',
                description: description ?? '',
                price: price ?? 0,
                stock: stock ?? 0
            }

            await Product.create(payload)

            return res.status(201).json({ status: 'success', payload: payload })

        } catch (error) {

            console.log(error)

            return res.status(400).json({ status: 'failed', message: 'gagal' ?? error.errors[0].message })

        }

    }

    static update = async (req, res) => {

        const { name, description, price, stock } = req.body

        const id = req.params

        let statusCode = 200
        let status = 'success'
        let message = ''

        try {

            const product = await Product.findByPk(id)

            const payload = {
                name: name ?? product.dataValues.name,
                description: description ?? product.dataValues.description,
                price: price ?? product.dataValues.price,
                stock: stock ?? product.dataValues.stock
            }

            if (!product) {
                statusCode = 404
                message = `product with id ${id} not found`
                throw error
            }

            await Product.update(payload, {
                where: {
                    id
                }
            })

            return res.status(statusCode).json({ status: status, payload: payload })

        } catch (error) {

            status = 'failed'
            return res.status(statusCode).json({ status: status, message: message ?? error.errors[0].message })

        }

    }

    static delete = async (req, res) => {

        const id = +req.params.id

        let statusCode = 200
        let status = 'success'
        let message = ''

        try {

            const product = await Product.findByPk(id)

            if (!product) {
                statusCode = 404
                status = 'failed'
                message = `product with id ${id} not found`
                throw error
            }

            const productDeleted = await Product.destroy({
                where: {
                    id
                }
            })

            if(productDeleted == 0) {
                statusCode = 500
                message = 'error occur while deleting product'
                throw error
            }
            
            return res.status(statusCode).json({ status: status, deleted: product })

        } catch (error) {

            status = 'failed'
            return res.status(statusCode).json({ status: status, message: message ?? error })

        }

    }

}

module.exports = ProductController