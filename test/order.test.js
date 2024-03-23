const request = require("supertest");
const app = require("../app");
const orderEndpoint = "/api/v1.0/order"

// * VARIABLES //
let tokenBuyer1 = ''
let tokenBuyer2 = ''
let tokenMerchant1 = ''
let tokenAdmin = ''
let productId1
let paymentMethodId
let orderId

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}

let idUser = []

//* MOCK REGISTER USER
describe("Test POST /api/v1.0/user ", () => {
    it("Register Buyero1 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "buyero1",
            lastName: "buyero1",
            userName: "buyero1",
            email: "buyero1@mail.com",
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
                idUser.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register buyero2 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "buyero2",
            lastName: "buyero2",
            userName: "buyero2",
            email: "buyero2@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "buyer",
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
                idUser.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register Merchanto1 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "merchanto1",
            lastName: "merchanto1",
            userName: "merchanto1",
            email: "merchanto1@mail.com",
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
                idUser.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register Admino1 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "admino1",
            lastName: "admino1",
            userName: "admino1",
            email: "admino1@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "admin",
            address: [
                {
                    "address": "Jakarta",
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
                idUser.push(res.body.payload.id)
                expect(res.statusCode).toBe(201);
                done();
            });
    });
});

describe(`Verify User`, () => {
    it(`Buyero1 Should be 200`, (done) => {
        request(app)
            .get(`/api/v1.0/verify/` + idUser[0])
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    })

    it(`Buyero2 Should be 200`, (done) => {
        request(app)
            .get(`/api/v1.0/verify/` + idUser[1])
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    })

    it(`Merchanto1 Should be 200`, (done) => {
        request(app)
            .get(`/api/v1.0/verify/` + idUser[2])
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    })
    
    it(`Admino1 Should be 200`, (done) => {
        request(app)
            .get(`/api/v1.0/verify/` + idUser[3])
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    })
})

// * MOCK LOGIN USER
describe("Test POST /login", () => {
    it("Buyer1 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'buyero1'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenBuyer1 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Buyer2 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'buyero2'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenBuyer2 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Merchant2 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchanto1'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenMerchant1 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Admin login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'admino1'
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
});

// * MOCK UPGRADE TO CREATE MERCHANT
describe("Test POST /api/v1.0/merchant ", () => {
    it("Register new Merchant2 should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            name: "Toko Merchant O"
        }
        request(app)
            .post("/api/v1.0/merchant")
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(201);
                done();
            });
    });
})

// * ADMIN CREATE CATEGORY AND PAYMENT METHOD
describe("TEST POST BY ADMIN", () => {
    it('Admin add new Category', (done) => {
        const req = mockRequest()
        req.body.name = "categoryo1"
        request(app)
            .post('/api/v1.0/category')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(201)
                done()
            })
    })
    it('Admin add new payment method', (done) => {
        const req = mockRequest()
        req.body.name = "VAO - 1"
        request(app)
            .post('/api/v1.0/payment')
            .send(req.body)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                paymentMethodId = res.body.payload.id
                expect(res.statusCode).toBe(201)
                done()
            })
    })
})

describe('Test Merchant Create Product', () => {
    it('Merchant add new product', (done) => {
        const req = mockRequest()
        req.body = {
            name: "Product Merchant1",
            categoryId: 1,
            description: "Product Merchant 1 udah itu aa",
            price: 150000,
            stock: 20
        }
        request(app)
            .post('/api/v1.0/products')
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                productId1 = res.body.payload.id
                expect(res.statusCode).toBe(201)
                done()
            })
    })
})

describe('Buyero1 create new Order', () => {
    it('Buyer01 create order return 201', (done) => {
        const req = mockRequest()
        req.body = {
            paymentMethodId: paymentMethodId,
            orderProducts: [
                {
                    productId: productId1,
                    quantity: 2
                }
            ]
        }

        request(app)
            .post(orderEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenBuyer1}`)
            .then((res) => {
                orderId = res.body.payload.id
                expect(res.statusCode).toBe(201)
                done()
            })
    })
})

describe('Test GET /order', () => {
    it('All Buyer fetch order should return 200', (done) => {
        request(app)
            .get(orderEndpoint)
            .set('Authorization', `Bearer ${tokenBuyer2}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Non-Authenticated User access order should return 401', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('Merchant fetch orders should return 403', (done) => {
        request(app)
            .get(orderEndpoint)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('Admin fetch orders should return 403', (done) => {
        request(app)
            .get(orderEndpoint)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

})

describe('Test GET /order/:id', () => {
    it('Order owner should return 200', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenBuyer1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Non-Authenticated User access order should return 401', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('Buyer access other buyer order should return 404', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenBuyer2}`)
            .then((res) => {
                expect(res.statusCode).toBe(404)
                done()
            })
    })

    it('Merchant access buyer order shoud return 403', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('Admin access buyer order shoud return 403', (done) => {
        request(app)
            .get(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })
})

describe('Test PATCH /order/:id', () => {
    it('Order owner should return 200', (done) => {
        request(app)
            .patch(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenBuyer1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('Buyer update other buyer order should return 404', (done) => {
        request(app)
            .patch(`${orderEndpoint}/${orderId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })
    
    it('Buyer update other buyer order should return 404', (done) => {
        request(app)
            .patch(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenBuyer2}`)
            .then((res) => {
                expect(res.statusCode).toBe(404)
                done()
            })
    })

    it('Merchant update buyer order should return 403', (done) => {
        request(app)
            .patch(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('Admin update buyer order should return 403', (done) => {
        request(app)
            .patch(`${orderEndpoint}/${orderId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('Buyer update complete order should return 400', (done) => {
        request(app)
        .patch(`${orderEndpoint}/${orderId}`)
        .set('Authorization', `Bearer ${tokenBuyer1}`)
        .then((res) => {
            expect(res.statusCode).toBe(400)
            done()
        })
    })

})

// //* NEGATIVE CASE //

// // NO AUTHENTICATION //
// describe.only("Test Order Router without Authentication", () => {
//     it('GET /order should response 401', (done) => {
//         request(app)
//             .get("/api/v1.0/order")
//             .then((res) => {
//                 expect(res.status).toBe(401)
//                 done()
//             })
//     })

//     it('GET /order/:id should response 401', (done) => {
//         const orderId = 1
//         request(app)
//             .get("/api/v1.0/order/" + orderId)
//             .then((res) => {
//                 expect(res.status).toBe(401)
//                 done()
//             })
//     })

//     it('PATCH /order/:id should response 401', () => {
//         const orderId = 1
//         request(app)
//             .patch("/api/v1.0/order/" + orderId)
//             .then((res) => {
//                 expect(res.status).toBe(401)
//             })
//     })
// })

// let token = ''

// describe("Test POST /login Admin", () => {
//     it("Should response 200", (done) => {
//         // Supertest berfungsi sebagai pelaksana server
//         const req = mockRequest();
//         req.body.userName = 'admin'
//         req.body.password = 'kapallawd'
//         request(app)
//             .post("/api/v1.0/auth/login")
//             .send(req.body)
//             .set('Accept', 'application/json')
//             .then((res) => {
//                 token = res.body.token
//                 // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
//                 expect(res.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

// // USER UNAUTHORIZED //
// describe('Test Order Router with login as admin', () => {
//     it('GET /order should response 403', (done) => {
//         request(app)
//             .get("/api/v1.0/order")
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })

//     it('GET /order/:id should response 403', (done) => {
//         const orderId = 1
//         request(app)
//             .get("/api/v1.0/order/" + orderId)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })

//     it('PATCH /order/:id should response 403', (done) => {
//         const orderId = 1
//         request(app)
//             .patch("/api/v1.0/order/" + orderId)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })
// })

// describe("Test POST /login Buyer", () => {
//     it("Should response 200", (done) => {
//         // Supertest berfungsi sebagai pelaksana server
//         const req = mockRequest();
//         req.body.userName = 'jokooo'
//         req.body.password = 'kapallawd'
//         request(app)
//             .post("/api/v1.0/auth/login")
//             .send(req.body)
//             .set('Accept', 'application/json')
//             .then((res) => {
//                 token = res.body.token
//                 // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
//                 expect(res.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

// // USER AUTHORIZED
// describe("Test Order Router with Authorized User", () => {
//     it('GET /order should response 200', (done) => {
//         request(app)
//             .get("/api/v1.0/order")
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(200)
//                 done()
//             })
//     })

//     it('GET /order/:id response 404 when order id is not found', (done) => {
//         const req = mockRequest();
//         req.params.id = 100
//         request(app)
//             .get("/api/v1.0/order/" + req.params.id)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(404)
//                 done()
//             })
//     })

//     it('PATCH /order/:id response 404 when order id is not found', (done) => {
//         const req = mockRequest();
//         req.params.id = 100
//         req.body.status = 'done'
//         request(app)
//             .patch("/api/v1.0/order/" + req.params.id)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.status).toBe(404)
//                 done()
//             })
//     })
// })