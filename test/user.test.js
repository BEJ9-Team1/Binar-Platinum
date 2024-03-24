const request = require("supertest");
const app = require("../app");

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}

let userId = []

describe("Test POST /user", () => {
    it("Register User Buyer Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "userbuyer",
            lastName: "userbuyer",
            userName: "userbuyer",
            email: "userbuyer@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "buyer",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                },
                {
                    "address": "jakarta",
                    "name": "office",
                    "isUsed": false
                }
            ]
        }
        request(app)
            .post("/api/v1.0/user")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                userId.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register User Merchant Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "usermerchant",
            lastName: "usermerchant",
            userName: "usermerchant",
            email: "usermerchant@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "merchant",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
        request(app)
            .post("/api/v1.0/user")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                userId.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register User Admin Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "useradmin",
            lastName: "useradmin",
            userName: "useradmin",
            email: "useradmin@mail.com",
            phoneNumber: "0819208489613",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "merchant",
            address: [
                {
                    "address": "Semarang",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
        request(app)
            .post("/api/v1.0/user")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                userId.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });
});

let tokenBuyer = ''
let tokenMerchant = ''
let tokenAdmin = ''

describe("Test POST /login", () => {
    it("User Buyer login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'userbuyer'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenBuyer = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("User Merchant login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'usermerchant'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenMerchant = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("User Admin login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'useradmin'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenAdmin = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

})

describe('Test GET /user', () => {
    it('Buyer get user data should return 200', (done) => {
        request(app)
            .get('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    it('Merchant get user data should return 200', (done) => {
        request(app)
            .get('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenMerchant}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    it('Admin get user data should return 200', (done) => {
        request(app)
            .get('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    it('get user data should be failed if no token', (done) => {
        request(app)
            .get('/api/v1.0/user')
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })
})

describe('Test PUT /user', () => {
    it('Buyer update data success shoud return 200', (done) => {
        const req = mockRequest()
        req.body = {
            firstName: "userbuyerupdate",
            lastName: "userbuyerupdate",
            userName: "userbuyer",
            email: "userbuyerupdate@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "buyer",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                },
                {
                    "address": "jakarta",
                    "name": "office",
                    "isUsed": false
                }
            ]
        }
        request(app)
            .put('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Merchant update data success shoud return 200', (done) => {
        const req = mockRequest()
        req.body = {
            firstName: "usermerchantupdate",
            lastName: "usermerchantupdate",
            userName: "usermerchant",
            email: "usermerchantupdate@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "merchant",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
        request(app)
            .put('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenMerchant}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Admin update data success shoud return 200', (done) => {
        const req = mockRequest()
        req.body = {
            firstName: "useradminupdate",
            lastName: "useradminupdate",
            userName: "useradmin",
            email: "useradminupdate@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "admin",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                },
                {
                    "address": "jakarta",
                    "name": "office",
                    "isUsed": false
                }
            ]
        }
        request(app)
            .put('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Update user data should be failed if no token', (done) => {
        const req = mockRequest()
        req.body = {
            firstName: "randomuserupdate",
            lastName: "randomuserupdate",
            userName: "randomuser",
            email: "randomuserupdate@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "buyer",
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                },
                {
                    "address": "jakarta",
                    "name": "office",
                    "isUsed": false
                }
            ]
        }
        request(app)
            .put('/api/v1.0/user')
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })
})

describe('Test DELETE /user', () => {
    it('Buyer delete account success should return 200', (done) => {
        request(app)
            .delete('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Merchant delete account success should return 200', (done) => {
        request(app)
            .delete('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenMerchant}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Admin delete account success should return 200', (done) => {
        request(app)
            .delete('/api/v1.0/user')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Non-Authenticated user delete account success should return 401', (done) => {
        request(app)
            .delete('/api/v1.0/user')
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })
})