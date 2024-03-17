jest.mock('../services/user_services', () => {
    return {
        registerUser: jest.fn(),
        emailIsExists: jest.fn(),
    }
})

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query
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

const { registerUser, emailIsExists } = require('../services/user_services')
const { create } = require('../controllers/user_controller')
const { User } = require('../models');

describe('Testing for register user', () => {
    const req = mockRequest()
    req.body = {
        firstName: 'firstName',
        lastName: 'lastName',
        userName: 'userName',
        email: 'mail@example.com',
        phoneNumber: 'phoneNumber',
        password: 'password',
        confirmPassword: 'password',
        role: 'admin',
        isActive: true,
        address: [
            {
                address: "address",
                name: "office",
                isUsed: true
            }
        ]
    }
    const next = mockNext()
    const res = mockResponse()

    it('test mock create', async () => {

        registerUser.mockResolvedValue(Promise.resolve(User));
        await create(req, res, next)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toBeCalledWith({
            message: 'Success',
            payload: User.dataValues
        })
    })

    it('test if email is exists', async () => {

        emailIsExists.mockResolvedValue(Promise.resolve(User))
        await create(req, res, next)
        expect(next).toBeCalledWith(new Error(`${User.email} has been registered before`))
    })

})