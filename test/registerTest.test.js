jest.mock('../services/user_services', () => {
    return {
        registerUser: jest.fn(),
        emailIsExists: jest.fn(),
    }
})

jest.mock('../services/mailer_services', () => {
    return {
        sendEmail: jest.fn()
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
const { sendEmail } = require('../services/mailer_services')
require('dotenv').config();

const req = mockRequest()
const next = mockNext()
const res = mockResponse()

beforeEach(() => {
    req.body = {
        firstName: 'firstName',
        lastName: 'lastName',
        userName: 'userName',
        email: process.env.NODEMAILER_EMAIL,
        phoneNumber: 'phoneNumber',
        password: 'password',
        confirmPassword: 'password',
        role: 'admin',
    }
})
describe('Function Testing for Register New User', () => {

    it('return error if email is exists', async () => {

        emailIsExists.mockResolvedValue(Promise.resolve({ email: process.env.NODEMAILER_EMAIL }))
        await create(req, res, next)
        expect(next).toBeCalledWith(new Error(`${req.body.email} has been registered before`))
    })

    it('return error if password inconsistent', async () => {

        req.body.confirmPassword = 'differentpassword'

        emailIsExists.mockResolvedValue(Promise.resolve(undefined))
        await create(req, res, next)
        if (req.body.password !== req.body.confirmPassword) {
            expect(next).toBeCalledWith(new Error('Password NOT Match With Confirm Password'))
        }

    })



    it('return 201 if registration success', async () => {

        emailIsExists.mockResolvedValue(Promise.resolve(undefined))
        registerUser.mockResolvedValue(Promise.resolve(User))
        sendEmail.mockReturnValue(true)
        await create(req, res, next)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toBeCalledWith({
            message: 'Success',
            payload: User.dataValues
        })
    })

})