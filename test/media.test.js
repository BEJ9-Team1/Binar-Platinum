const request = require("supertest");
const app = require("../app");

//POSITIVE CASE//
describe("Test GET /media", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        request(app)
            .get("/api/v1.0/media")
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});



const mockRequestMediaParams = (body = {}, params = {id:1}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test GET one /media/:id", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestMediaParams()
        request(app)
            .get("/api/v1.0/media/"+req.params.id)
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

// Mau bikin positive case buat destroy tp harus create media dlu :)


// NEGATIVE CASE
const mockRequestMediaParamsNegative = (body = {}, params = {id:100}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test DESTROY /media/:id", () => {
    it("Should response 404", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestMediaParamsNegative()
        request(app)
            .del("/api/v1.0/media/"+req.params.id)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(404);
                expect(res.body.message).toBe("Data does not exist")
                done();
            });
    });
});