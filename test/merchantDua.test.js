const request = require("supertest");
const app = require("../app");

//POSITIVE CASE//
describe("Test GET /merchant", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        request(app)
            .get("/api/v1.0/merchant")
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});

const mockRequestLogin = (body = {userName: "buyer", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

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

const mockRequestCreateMerchant = (body = {name: "Merchant 1 Test"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let merchantName = ''

describe("Test CREATE /merchant", () => {
    it("Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreateMerchant()
        request(app)
            .post("/api/v1.0/merchant")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                merchantName = res.body.payload.name
                expect(res.status).toBe(201);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});


const mockRequestGetOneMerchant = (body = {}, params = {merchantName}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};


describe("Test GET /merchant/:name", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneMerchant()
        request(app)
            .get("/api/v1.0/merchant/"+req.params.merchantName)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});



// NEGATIVE CASE

const mockRequestCreateMerchant2 = (body = {name: "Merchant 2 Test"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test CREATE /merchant (user has a merchant already)", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreateMerchant2()
        request(app)
            .post("/api/v1.0/merchant")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(400);
                done();
            });
    });
});

const mockRequestLogin2 = (body = {userName: "merchant", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let token2 = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLogin2();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                token2 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

describe("Test CREATE /merchant (merchant name has been used)", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreateMerchant()
        request(app)
            .post("/api/v1.0/merchant")
            .set('Authorization', `Bearer ${token2}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(400);
                done();
            });
    });
});