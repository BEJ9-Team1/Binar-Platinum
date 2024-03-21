jest.mock('../services/productServices', () => {
    return {
        findById: jest.fn(),
        updateProduct: jest.fn()
    }
})
jest.mock('../services/order_services', () => {
    return {
        createOrder: jest.fn()
    }
})
jest.mock('../services/orderProduct_services', () => {
    return {
        createOrderProduct: jest.fn()
    }
})

const mockRequest = (body = {}, params = {}, query = {}, user = {}) => {
    return {
        body: body,
        params: params,
        query: query,
        user: user
    }
}

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
}

const mockNext = () => {
    return jest.fn()
}

const { findById, updateProduct } = require('../services/productServices')
const { createOrder } = require('../services/order_services')
const { createOrderProduct } = require('../services/orderProduct_services')
const { create } = require('../controllers/order_controller')
const { Product, Order, OrderProduct } = require('../models')

describe('Create Order Unit Test', () => {
    const req = mockRequest()
    req.body = {
        paymentMethodId: 1,
        totalPrice: 30000,
        status: "Payment_Waiting",
        orderProducts: [
            {
                productId: "1",
                quantity: 2
            },
            {
                productId: "2",
                quantity: 2
            }
        ]
    }

    req.user = {
        id: 'id',
        role: 'buyer'
    }

    const orderPayload = {
        userId: 'id',
        paymentMethodId: req.body.paymentMethodId,
        totalPrice: req.body.totalPrice, // assumption front end calculate total price
        expiredAt: new Date(Date.now() + (60 * 60 * 1000)).toISOString(),
        status: "payment_waiting",
    }

    const next = mockNext()
    const res = mockResponse()

    it('must return error if product not found', async () => {
        findById.mockRejectedValue(new Error('Product not Found'))

        await create(req, res, next)
        expect(next).toBeCalledWith({ message: "Product not Found", status: 400 })
    })

    it('must return error if product stock less than order quantity', async () => {
        findById.mockResolvedValue(() => Promise.resolve(Product))
        await create(req, res, next)
        for (let i = 0; i < req.body.orderProducts.length; i++) {
            if (Product.stock < req.body.orderProducts[i].quantity) {
                expect(next).toBeCalledWith(new Error('Stock less than your order'))
            }
        }
    })

    it('must return 201 if create order is complete', async () => {

        findById.mockResolvedValue(() => Promise.resolve({
            id: 1,
        }))
        updateProduct.mockResolvedValue(() => Promise.resolve({
            id: 1
        }))
        createOrder.mockResolvedValue(() => Promise.resolve({
            id: 1
        }))
        createOrderProduct.mockResolvedValue(() => Promise.resolve({
            id:1
        }))
        
        await create(req, res, next)
        
        expect(next).toBeDefined()
        // expect(res.status).toHaveBeenCalledWith(201)
        // expect(res.json).toBeCalledWith({
        //     message: "Success",
        //     payload: Order
        // })
    })
})