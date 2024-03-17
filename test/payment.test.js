const request = require("supertest");
const app = require("../app");

//POSITIVE CASE//
const mockRequestLogin = (body = {userName: "admin", password: "kapallawd"}, params = {}, query = {}) => {
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


const mockRequestCreate = (body = {name: "va bca"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test CREATE /payment", () => {
    it("Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreate()
        request(app)
            .post("/api/v1.0/payment")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(201);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});


let paymentId = ''
let paymentName = ''

describe("Test GET ALL /payment", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server

        request(app)
            .get("/api/v1.0/payment")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                paymentId = res.body.data.rows[0].id
                console.log(paymentId);
                console.log(res.body);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Request Success")
                done();
            });
    });
});

const mockRequestGetOneId = (body = {name: "va cimb"}, params = {paymentId}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

const mockRequestGetOneName = (body = {}, params = {paymentName}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};


describe("Test PUT /payment", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneId()
        request(app)
            .put("/api/v1.0/payment/"+req.params.paymentId)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body.data[1][0].name);
                paymentName = res.body.data[1][0].name
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});

describe("Test GET ONE /payment", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneName()
        request(app)
            .get("/api/v1.0/payment/"+req.params.paymentName)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});

describe("Test DESTROY /payment", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneId()
        request(app)
            .del("/api/v1.0/payment/"+req.params.paymentId)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Success")
                done();
            });
        });
    });
    
    //NEGATIVE CASE//
    describe("Test REDESTROY /payment", () => {
        it("Should response 404", (done) => {
            // Supertest berfungsi sebagai pelaksana server
            req = mockRequestGetOneId()
            request(app)
                .del("/api/v1.0/payment/"+req.params.paymentId)
                .set('Authorization', `Bearer ${token}`)
                .send(req.body)
                .then((res) => {
                    // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                    expect(res.status).toBe(404);
                    expect(res.body.message).toBe("Payment Has Deleted")
                    done();
                });
        });
    });
    
    describe("Test RECREATE /payment after deleted", () => {
    it("Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreate()
        request(app)
            .post("/api/v1.0/payment")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                paymentId = res.body.payload.id
                console.log(res.body);
                expect(res.status).toBe(201);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});


describe("Test RECREATE /payment", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreate()
        request(app)
            .post("/api/v1.0/payment")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(`${req.body.name} has been added`)
                done();
            });
    });
});

const mockRequestReput = (body = {name: "va bca"}, params = {paymentId}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test REPUT /payment", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestReput()
        request(app)
            .put("/api/v1.0/payment/"+req.params.paymentId)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(`${req.body.name} has been added`)
                done();
            });
        });
    });

    
const mockRequestLoginUnauth = (body = {userName: "buyer", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test Unauthorized Account POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLoginUnauth();
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

describe("Test Unauthorized CREATE /payment", () => {
    it("Should response 403", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreate()
        request(app)
            .post("/api/v1.0/payment")
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(403);
                done();
            });
    });
});

describe("Test Unauthorized PUT /payment", () => {
    it("Should response 403", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneId()
        request(app)
            .put("/api/v1.0/payment/"+req.params.paymentId)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(403);
                done();
            });
    });
});

describe("Test Unauthorized DESTROY /payment", () => {
    it("Should response 403", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneId()
        request(app)
            .del("/api/v1.0/payment/"+req.params.paymentId)
            .set('Authorization', `Bearer ${token}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(403);
                done();
            });
    });
});
