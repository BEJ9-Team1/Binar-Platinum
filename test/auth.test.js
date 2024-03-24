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

const mockRequestRegist = (body = {
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

    describe("Test POST /api/v1.0/auth/register ", () => {
        it("Regist Should response 201", (done) => {
            // Supertest berfungsi sebagai pelaksana server
            const req = mockRequestRegist()
            request(app)
            .post("/api/v1.0/auth/register")
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

describe("Test POST /logout", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        request(app)
            .post("/api/v1.0/auth/logout")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                console.log(res.body);
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                done();
            });
    });
});

// NEGATIVE CASE
const mockRequestRegistPwPDoesntMatch = (body = {
    firstName: "biuyer",
    lastName: "biuyer", 
    userName: "biuyer",
    email: "biuyeiiir@mail.com",
    phoneNumber: "0819208489612",
    password: "kapallawd",
    confirmPassword: "asdasdasd",
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

const mockRequestUnauth = (body = {userName: "admin", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

const mockRequestWrongPw = (body = {userName: "biuyer", password: "salahpassword"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

const mockRequestAccountNotFound = (body = {userName: "tidakada", password: "tidakada"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test Register Failed: Account Has been registered POST /auth/register", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestRegist();
        request(app)
            .post("/api/v1.0/auth/register")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(400);
                done();
            });
    });
});

describe("Test Register Failed: Password with confirm pw doesnt match POST /auth/register", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestRegistPwPDoesntMatch();
        request(app)
            .post("/api/v1.0/auth/register")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(400);
                done();
            });
    });
});

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

describe("Test Wrong Password POST /login", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestWrongPw();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(500);
                done();
            });
    });
});

describe("Test Account Not Found POST /login", () => {
    it("Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestAccountNotFound();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(500);
                done();
            });
    });
});