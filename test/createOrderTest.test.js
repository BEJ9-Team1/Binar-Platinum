jest.mock('../services/productServices', () => {
    return {
        findById: jest.fn((x) => x),
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
        json: jest.fn()
    }
}

const mockNext = () => {
    return jest.fn((x) => x)
}

const { findById, updateProduct } = require('../services/productServices')
const { createOrder } = require('../services/order_services')
const { createOrderProduct } = require('../services/orderProduct_services')
const { create } = require('../controllers/order_controller')

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
        role:'buyer'
    }

    console.log("req",req)

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
        findById.mockResolvedValue(() => Promise.resolve(undefined))
        updateProduct.mockResolvedValue(() => Promise.resolve(undefined))
        createOrder.mockResolvedValue(() => Promise.resolve(undefined))
        createOrderProduct.mockResolvedValue(() => Promise.resolve(undefined))

        await create(req, res, next)
        expect(next).toBeCalledWith(new Error('Product not Found'))
    })
})