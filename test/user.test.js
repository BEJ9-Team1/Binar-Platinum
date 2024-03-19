const request = require("supertest");
const app = require("../app");

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

//* NEGATIVE CASE //
// NO AUTHENTICATION //
describe('Test User Route without Authenticaation', () => {
    it('GET /user should return 401', (done) => {
        request(app)
            .get("/api/v1.0/user")
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
    it('PUT /user should return 401', (done) => {
        request(app)
            .put("/api/v1.0/user")
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })
})

// Param not found //
describe('Test User Route with no User Found', () => {
    it('GET /user/:email should response 404', (done) => {
        const req = mockRequest()
        req.params.email = 'example@gmail.com'
        request(app)
            .get("/api/v1.0/user/" + req.params.email)
            .then((res => {
                expect(res.status).toBe(404)
                done()
            }))
    })
    it('DELETE /user/id should response 404', (done) => {
        const req = mockRequest()
        req.params.id = 120
        request(app)
            .delete("/api/v1.0/user" + req.params.id)
            .then((res) => {
                expect(res.status).toBe(404)
                done()
            })
    })
})

let token = ''

// * POSITIVE CASE //
describe("Test POST /login User", () => {
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

describe('Test User Route with authentiction', () => {
    it('GET /user should return 200', (done) => {
        request(app)
            .get("/api/v1.0/user")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    it('GET /user/:email should return 200', (done) => {
        const req = mockRequest()
        req.params.email = 'admin@mail.com'
        request(app)
            .get("/api/v1.0/user/" + req.params.email)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
    it('PUT /user should return 200', (done) => {
        const req = mockRequest()
        req.body = {
            firstName: 'firstName',
            lastName: 'lastName',
            userName: 'userName',
            email: 'email@mail.com',
            phoneNumber: 'phoneNumber',
            password: 'userDTO.password',
            confirmPassword: 'userDTO.password',
            role: 'admin',
            isActive: false,
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": false
                },
                        {
                    "address": "jakarta",
                    "name": "officeedit",
                    "isUsed": true
                },
            ]
        }
        request(app)
            .put("/api/v1.0/user")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})