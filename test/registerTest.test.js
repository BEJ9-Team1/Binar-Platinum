const user_service = require('../services/user_services')
const { create } = require('../controllers/user_controller')
const BadRequestError = require('../errors/bad-request')
jest.mock('../models')

const address = [
    {
        "address": "jogja",
        "name": "office",
        "isUsed": true
    },
    {
        "address": "jakarta",
        "name": "office",
        "isUsed": true
    }
]

const body = {
    firstName: "firstName",
    lastName: "lastName",
    userName: "userName",
    email: "email@gmail.com",
    phoneNumber: "phoneNumber",
    password: "password",
    confirmPassword: "password",
    role: "buyer",
    isActive: true,
    address: address
}

const mockRequest = (body = {
    firstName: "firstName",
    lastName: "lastName",
    userName: "userName",
    email: "email@gmail.com",
    phoneNumber: "phoneNumber",
    password: "password",
    confirmPassword: "password",
    role: "buyer",
    isActive: true,
    address: [
        {
            "address": "jogja",
            "name": "office",
            "isUsed": true
        },
        {
            "address": "jakarta",
            "name": "office",
            "isUsed": true
        }
    ]
}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query
    }
}

const mockResponse = () => {
    const res = {};

    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);

    return res;
};

const mockDB = 

describe("Test register handler on user controller", () => {
    test("Must return status 201", (done) => {
        const req = mockRequest();
        const res = mockResponse();

        create(req, res).then(() => {
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                message: "Success",
                payload: {
                    firstName: "firstName",
                    lastName: "lastName",
                    userName: "username",
                    email: "email@gmail.com",
                    phoneNumber: "phoneNumber",
                    password: "password",
                    role: "buyer",
                    isActive: true,
                    address: [
                        {
                            "address": "jogja",
                            "name": "office",
                            "isUsed": true
                        },
                        {
                            "address": "jakarta",
                            "name": "office",
                            "isUsed": true
                        }
                    ]
                }
            });
            done();
        });
    }, 15000);
});

const userDTO = {
    email: 'existing@example.com',
}

describe("Test for email avaialbility", () => {

    test("Must throw BadRequestError if email is used", async () => {
    
        try {
            const lookup = await user_service.emailIsExists(userDTO.email)
    
            if (lookup) {
                throw BadRequestError(`${lookup.email} has been registered before`)
            }
    
        } catch (error) {
            expect(error instanceof BadRequestError).toBe(true);
            expect(error.message).toBe(`${userDTO.email} has been registered before`)
        }
    
    })

})

describe("Test for confirmation password", () => {
    test('Must throw BadRequestError if password incosnsistent', () => {
        
        userDTO.password = 'password',
        userDTO.confirmPassword = 'confirmPassword'
        try {
            if(userDTO.password !== userDTO.confirmPassword) {
                throw new BadRequestError('Password NOT Match With Confirm Password')
            }
        } catch (error) {
            expect(error.message).toBe('Password NOT Match With Confirm Password')
        }

    })
})

