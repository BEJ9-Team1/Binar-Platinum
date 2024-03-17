const request = require("supertest");
const app = require("../app");


//POSITIVE CASE//
const mockRequestLogin = (body = {userName: "biuyer", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

const mockRequestRegistPositive = (body = {
    firstName: "biuyer",
    lastName: "biuyer", 
    userName: "biuyer",
    email: "biuyeiiir@mail.com",
    phoneNumber: "0819208489612",
    password: "kapallawd",
    confirmPassword: "kapallawd",
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
        query: query,
    };
};


describe("Test GET /health-check", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        request(app)
        .get("/health-check")
        .send()
        .then((res) => {
            // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});

    describe("Test POST /api/v1.0/user ", () => {
        it("Regist Should response 201", (done) => {
            // Supertest berfungsi sebagai pelaksana server
            const req = mockRequestRegistPositive()
            request(app)
            .post("/api/v1.0/user")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(201);
                done();
            });
        });
    });
    
let token = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLogin();
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

let addressId = ''

describe("Test GET ALL /address", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server

        request(app)
            .get("/api/v1.0/address")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                addressId = res.body.data.rows[0].id
                console.log(addressId);
                console.log(res.body);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Request Success")
                done();
            });
    });
});


const mockRequestGetOne = (body = {}, params = {addressId}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test GET ONE /address:id", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOne()
        request(app)
            .get("/api/v1.0/address/"+req.params.addressId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(req.params.addressId);
                console.log(res.body);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                done();
            });
    });
});

describe("Test DESTROY ONE /address:id", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOne()
        request(app)
            .del("/api/v1.0/address/"+req.params.addressId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(req.params.addressId);
                console.log(res.body);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Success");
                done();
            });
    });
});


//NEGATIVE CASE//
const mockRequestUnauth = (body = {userName: "admin", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};


describe("Test Unauthorized Account POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestUnauth();
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



describe("Test Unauthorized GET ONE /address:id", () => {
    it("Should response 403", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOne()
        request(app)
            .get("/api/v1.0/address/"+req.params.addressId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(req.params.addressId);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(403);
                expect(res.body.message).toBe("Access Forbidden")
                done();
            });
    });
});

describe("Test Unauthorized DESTROY ONE /address:id", () => {
    it("Should response 403", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOne()
        request(app)
            .del("/api/v1.0/address/"+req.params.addressId)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(req.params.addressId);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(403);
                expect(res.body.message).toBe("Access Forbidden")
                done();
            });
    });
});