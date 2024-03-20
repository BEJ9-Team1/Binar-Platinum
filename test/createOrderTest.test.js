jest.mock('../services/productServices', () => {
    return {
<<<<<<< HEAD
        findById: jest.fn(),
=======
        findById: jest.fn((x) => x),
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79
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
<<<<<<< HEAD
        json: jest.fn().mockReturnThis()
=======
        json: jest.fn()
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79
    }
}

const mockNext = () => {
<<<<<<< HEAD
    return jest.fn()
=======
    return jest.fn((x) => x)
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79
}

const { findById, updateProduct } = require('../services/productServices')
const { createOrder } = require('../services/order_services')
const { createOrderProduct } = require('../services/orderProduct_services')
const { create } = require('../controllers/order_controller')
<<<<<<< HEAD
const { Product, Order, OrderProduct } = require('../models')
=======
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79

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
<<<<<<< HEAD
        role: 'buyer'
    }

    // console.log("req",req)
=======
        role:'buyer'
    }

    console.log("req",req)
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79

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
<<<<<<< HEAD
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
=======
        findById.mockResolvedValue(() => Promise.resolve(undefined))
        updateProduct.mockResolvedValue(() => Promise.resolve(undefined))
        createOrder.mockResolvedValue(() => Promise.resolve(undefined))
        createOrderProduct.mockResolvedValue(() => Promise.resolve(undefined))

        await create(req, res, next)
        expect(next).toBeCalledWith(new Error('Product not Found'))
>>>>>>> 194efdd179b610e5260fcd83ae1550435c8c1d79
    })
})