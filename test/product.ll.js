const request = require("supertest");
const app = require("../app");

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}

const productEndpoint = "/api/v1.0/products"

//* NEGATIVE CASE //
// NO AUTHENTICATION //
describe('Test Products Route without Authentication', () => {
    const req = mockRequest()
    req.params.id = 25

    it(`GET /products/:id should return 404 if product doesn't exist`, (done) => {
        request(app)
            .get(`${productEndpoint}/` + req.params.id)
            .then((res) => {
                expect(res.statusCode).toBe(404)
                done()
            })
    })
    it('POST /products should return 401', (done) => {
        req.body = {
            name: "PS 5 Baru",
            category: "teknologi",
            description: "PS 5 udah itu aja",
            price: 15000000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
    it('PUT /products should return 401', (done) => {
        request(app)
            .put(`${productEndpoint}/` + req.params.id)
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
    it('DELETE /products should return 401', (done) => {
        request(app)
            .delete(`${productEndpoint}/` + req.params.id)
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
})

// LOGIN AS A BUYER
let token = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'muhammad'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                token = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

// AUTHENTICATION WITH NO AUTHORIZE
describe('Test Product Route With Authentication and No Authorization', () => {
    it('POST /products should return 403', (done) => {
        const req = mockRequest()
        req.body = {
            name: "PS 5 Baru",
            category: "teknologi",
            description: "PS 5 udah itu aja",
            price: 15000000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })
    it('PUT /products should return 403', (done) => {
        const req = mockRequest()
        req.params.id = 1
        const productId = req.params.id
        request(app)
            .put(`${productEndpoint}/` + productId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })
    it('DELETE /products should return 401', (done) => {
        const req = mockRequest()
        req.params.id = 1
        const productId = req.params.id
        request(app)
            .delete(`${productEndpoint}/` + productId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })
})

// LOGIN AS MERCHANT //
describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchant'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                token = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

// AUTHORIZED MERCHANT WITH NON EXIST CATEGORY
describe('User authorized and category not found', () => {
    const req = mockRequest()
    req.body = {
        name: "PS 5 Baru",
        category: "teknologgi",
        description: "PS 5 udah itu aja",
        price: 15000000,
        stock: 20
    }
    it('POST /products should return 404', (done) => {
        request(app)
            .post(productEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(404);
                done();
            })
    })
})

// UNAUTHORIZED MERCHANT TO MANIPULATE PRODUCTS
describe('User is authorized but no access to other merchant product', () => {
    const req = mockRequest()
    req.params.id = 4
    req.body = {
        name: "PS 5 Baru Banget",
        description: "PS 5 udah itu aja",
        price: 15000000,
        stock: 20
    }

    it('PUT /products/:id should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${req.params.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403);
                done();
            })
    })
    it('DELETE /products/:id should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${req.params.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(403);
                done();
            })
    })
})

// * POSITIVE CASE //
// UNAUTHENTICATED USER TO FETCH PRODUCTS
describe('User access to see product and product details', () => {
    it('GET /products should return 200', (done) => {
        request(app)
            .get(productEndpoint)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
    })
    it('GET /products/:id should return 200 if product id is exists', (done) => {
        const req = mockRequest()
        req.params.id = 4
        request(app)
            .get(`${productEndpoint}/${req.params.id}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                done();
            })
    })
})

// AUTHENTICATED AND AUTHORIZED MERCHANT TO MANIPULATE PRODUCTS
describe('Authorized Merchant Manipulate Products', () => {
    const req = mockRequest()
    req.body = {
        name: "Kabel PS 5",
        category: "teknologi",
        description: "Kabel PS 5 udah itu aja",
        price: 15000,
        stock: 200
    }
    req.params.id = 1
    it('POST /products should return 201', (done) => {
        request(app)
            .post(productEndpoint)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.status).toBe(201)
                done()
            })
    })
    it('PUT /products/:id should return 200', (done) => {
        delete req.body.category
        request(app)
            .put(`${productEndpoint}/${req.params.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })

    })
    it('DELETE /products/:id should return 200', (done) => {
        request(app)
            .delete(`${productEndpoint}/${req.params.id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })
})

