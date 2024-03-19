const request = require("supertest");
const app = require("../app");


//* NEGATIVE CASE //

// NO AUTHENTICATION //
describe("Test Order Router without Authentication", () => {
    it('GET /order should response 401', (done) => {
        request(app)
            .get("/api/v1.0/order")
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })

    it('GET /order/:id should response 401', (done) => {
        const orderId = 1
        request(app)
            .get("/api/v1.0/order/" + orderId)
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })

    it('PATCH /order/:id should response 401', () => {
        const orderId = 1
        request(app)
            .patch("/api/v1.0/order/" + orderId)
            .then((res) => {
                expect(res.status).toBe(401)
            })
    })
})

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}

beforeEach(() => {
    const req = mockRequest()
    delete req.body
    delete req.params
    delete req.query
})

let token = ''

describe("Test POST /login Admin", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'admin'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                token = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

// USER UNAUTHORIZED //
describe('Test Order Router with unauthorized user', () => {
    it('GET /order should response 403', (done) => {
        request(app)
            .get("/api/v1.0/order")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })

    it('GET /order/:id should response 403', (done) => {
        const orderId = 1
        request(app)
            .get("/api/v1.0/order/" + orderId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })

    it('PATCH /order/:id should response 403', (done) => {
        const orderId = 1
        request(app)
            .patch("/api/v1.0/order/" + orderId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(403)
                done()
            })
    })
})

describe("Test POST /login User & Merchant", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'buyer'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                token = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

// USER AUTHORIZED
describe("Test Order Router with Authorized User", () => {
    it('GET /order should response 200', (done) => {
        request(app)
            .get("/api/v1.0/order")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it('GET /order/:id response 404 when order id is not found', (done) => {
        const req = mockRequest();
        req.params.id = 1
        request(app)
            .get("/api/v1.0/order/" + req.params.id)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.status).toBe(404)
                done()
            })
    })

    it('PATCH /order/:id response 404 when order id is not found', (done) => {
        const req = mockRequest();
        req.params.id = 1
        req.body.status = 'done'
        request(app)
            .patch("/api/v1.0/order/" + req.params.id)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.status).toBe(404)
                done()
            })
    })
})