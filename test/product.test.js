const request = require("supertest");
const app = require("../app");
const productEndpoint = "/api/v1.0/products"

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}


// * VARIABLES //
let tokenBuyer = ''
let tokenMerchant1 = ''
let tokenMerchant2 = ''
let tokenAdmin = ''
let productId1
let productId2

// * MOCK LOGIN BUYER
describe("Test POST /login", () => {
    it("Buyer1 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'buyer'
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

    it("Merchant1 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchant'
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

    it("Merchant2 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchant2'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenMerchant2 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Admin login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'admin'
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
            name: "Toko Merchant 1"
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

    it("Register new Merchant2 should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            name: "Toko Merchant 2"
        }
        request(app)
            .post("/api/v1.0/merchant")
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(201);
                done();
            });
    });
});

// * ADMIN CREATE NEW CATEGORY
describe('Test POST /category', () => {
    it('must return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "category1"
        }
        request(app)
            .post("/api/v1.0/category")
            .send(req.body)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                console.log("RES CATEGORY", res.body)
                expect(res.statusCode).toBe(201)
                done()
            })
    })
})

describe('Test POST /products', () => {
    it('success create product merchant1 should return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "Product Merchant1",
            categoryId: 1,
            description: "Product Merchant 1 udah itu aa",
            price: 150000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                productId1 = res.body.payload.id
                expect(res.statusCode).toBe(201)
                done()
            })
    })

    it('success create product merchant2 should return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "Product Merchant 2",
            categoryId: 1,
            description: "Product Merchant 2 udah itu aa",
            price: 150000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .then((res) => {
                productId2 = res.body.payload.id
                console.log("ID PRODUCT 2 ==>", productId2);
                done()
            })
    })

    const req = mockRequest()
    req.body = {
        name: "Product non-Merchant",
        categoryId: 1,
        description: "Product non-Merchant udah itu aa",
        price: 150000,
        stock: 20
    }

    it('failed unauthenticated user create new product should return 401', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer create new product should return 403', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin create new product should return 403', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

})

describe('TEST PUT /products/:id', () => {
    const req = mockRequest()
    req.body = {
        name: "Product Merchant 1 updated",
    }
    it('success update product should return 200', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed unauthenticated user update product should return 401', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed unauthorized merchant update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })
})

describe('TEST DELETE /products/:id', () => {
    it('success delete product should return 200', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed unauthenticated user delete product should return 401', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed unauthorized merchant delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId2}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })
})

describe('TEST GET /products', () => {
    it('fetch all products should return 200', (done) => {
        request(app)
            .get(productEndpoint)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})
const { v4: uuidv4 } = require('uuid');
let randomUUID = uuidv4()

describe('TEST GET products/:id', () => {
    it('success fetch product by product id should return 200', (done) => {
        request(app)
            .get(`${productEndpoint}/${productId2}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed fetch if product id not found should return 404', (done) => {
        request(app)
            .get(`${productEndpoint}/${randomUUID}`)
            .then((res) => {
                expect(res.statusCode).toBe(404)
                done()
            })
    })
})