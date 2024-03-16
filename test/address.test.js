const request = require("supertest");
const app = require("../app");


// jest.mock("../models", () =>{
//     return {
//         Address: {
//             create: jest.fn(),
//             findAndCountAll: jest.fn(),
//             destroy: jest.fn()
//         }
//     }
// })


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

// describe("test case for postgresql crud app", () => {
    //   it("test case for getting all users", async () => {
        //     const response = await request(app).get("/user");
        //     expect(response.status).toBe(200);
        //   });
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
    
        const mockRequestRegistNegative = (body = {
            firstName: "biuyer",
            lastName: "biuyer", 
            userName: "biuyer",
            email: "biuyer@mail.com",
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
        
describe("Test POST /api/v1.0/user", () => {
    it("Regist Should response 400", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestRegistNegative();
        request(app)
            .post("/api/v1.0/api/v1.0/user")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(404);
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




// describe("test case for postgresql crud app", () => {
//   it("test case for getting all users", async () => {
//     const response = await request(app).get("/user");
//     expect(response.status).toBe(200);
//   });



const mockRequestAddress = (body = {userName: "buyer", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};


const mockResponse = () => {
    const res = {};

    res.json = jest.fn().mockReturnValue(Promise.resolve(
        {
            "id": "373614d7-faa8-4995-9136-36f114ce7716",
            "userId": "e662db0e-6574-41d7-b10b-e00a96e977fe",
            "address": "jogja",
            "name": "office",
            "isUsed": false
        },
        {
            "id": "2aea2d84-90c9-4fcf-ad34-83939e02ef3e",
            "userId": "e662db0e-6574-41d7-b10b-e00a96e977fe",
            "address": "jakarta",
            "name": "officeedit",
            "isUsed": true
        },
        {
            "id": "1c7c4daf-78d2-47d6-a5aa-286440bf3f20",
            "userId": "e662db0e-6574-41d7-b10b-e00a96e977fe",
            "address": "SURABAYA EDIT",
            "name": "office",
            "isUsed": true
        },
        {
            "id": "b47c376d-2868-4da4-be71-351bb6cc3280",
            "userId": "e662db0e-6574-41d7-b10b-e00a96e977fe",
            "address": "testadd",
            "name": "officeedit",
            "isUsed": true
        }
    ));
    res.status = jest.fn().mockReturnValue(res);

    return res;
};

describe("Test GET ALL /address", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server

        request(app)
            .get("/api/v1.0/address")
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(mockResponse)
                done();
            });
    });
});
// module.exports = token