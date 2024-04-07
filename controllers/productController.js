const merchant_services = require('../services/merchant_services')
const productServices = require('../services/productServices')
const categoryServices = require('../services/category_services')
const productValidator = require('../validators/productValidator')
const client = require('../config/elastics-search')
const { NotFoundError, UnauthorizedError } = require('../errors');

const index = async (req, res) => {

    try {
        //Passing to getAll service
        const products = await productServices.getAll()

        return res.status(200).json({ message: 'success', payload: products })

    } catch (error) {

        return res.status(404).json({ message: 'failed', message: message })

    }

}

const search = async (req, res, next) => {
    try {
        let dataId = []
        const { name } = req.query;
        //searching using client elasticsearch
        const response = await client.search({ 
            index: 'belajar_elasticsearch',
            body: {
              query: {
                match: { name: name },
              },
            },
          });

        const data = response.hits.hits
        //get id from elasticsearch response
        for(data_product of data){
            dataId.push(data_product._source.id)
        }
        //passing dataId for search service
        const products = await productServices.search(dataId)

        return res.status(200).json({ message: 'success', payload: products })

    } catch (error) {

        next(error)

    }

}

const findOne = async (req, res, next) => {

    const id = req.params.id

    try {

        const product = await productServices.findById(id)

        if (!product) throw new NotFoundError(`product with id ${id} not found`)

        return res.status(200).json({ message: 'success', payload: product })

    } catch (error) {

        next(error)

    }

}

const create = async (req, res, next) => {

    try {

        const userId = req.user.id

        const merchant = await merchant_services.lookup(userId)

        if (!merchant) throw new UnauthorizedError(`you don't have any merchant, register first`)

        //validate request body
        const productDTO = await productValidator.createProductDTO.validateAsync(req.body)

        const category = await categoryServices.findById(req.body.categoryId)

        if (!category) throw new NotFoundError(`category ${category} not found`)

        const payload = {
            name: productDTO.name,
            categoryId: category.id,
            merchantId: merchant.id,
            description: productDTO.description,
            price: productDTO.price,
            stock: productDTO.stock
        }
        //passing dataId for create service
        const product = await productServices.createProducts(payload)

        const elasticsearch = await client.index({
            index: 'belajar_elasticsearch',
            body: {
                id: product.dataValues['id'],
                name: product.dataValues['name'],
                price: product.dataValues['price']
            }
          })
        return res.status(201).json({ message: 'success', payload: product, elasticsearch: {id: elasticsearch._id, result: elasticsearch.result} })

    } catch (error) {

        next(error)

    }

}

const update = async (req, res, next) => {

    const id = req.params.id

    try {

        const merchant = await merchant_services.lookup(req.user.id)

        const product = await productServices.findById(id)

        if (!product) throw new NotFoundError(`product with id ${id} not found`)

        if (product.dataValues.merchantId !== merchant.dataValues.id) {
            throw new UnauthorizedError(`Not Authorized`)
        }

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

const deleteProduct = async (req, res, next) => {

    const id = req.params.id

    const userId = req.user.id

    try {

        const merchant = await merchant_services.lookup(userId)

        const product = await productServices.findById(id)
        if (!product) {
            throw new NotFoundError('Product not found')
        }

        if (product.dataValues.merchantId !== merchant.dataValues.id) {
            throw new UnauthorizedError(`Not Authorized`)
        }

        const productDeleted = await productServices.deleteProduct(id)

        if (productDeleted == 0) throw new NotFoundError('no product was deleted')

        return res.status(200).json({ message: 'success', payload: null })

    } catch (error) {

        next(error)

    }

}


module.exports = {
    index,
    findOne,
    create,
    update,
    deleteProduct,
    search
}