const request = require("supertest");
const app = require("../app");

// Create Category, Merchant, dan Product terlebih dahulu sebelum create cart

// * ADMIN CREATE NEW CATEGORY
const mockRequestLoginAdmin = (body = {userName: "admin", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let tokenAdmin = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLoginAdmin();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                tokenAdmin = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

const mockRequestCategory = (body = {name: "categoryTestCart"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe('Test POST /category', () => {
    it('must return 201', (done) => {
        const req = mockRequestCategory()
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

const mockRequestRegistMerchantTestCart = (body = {
    firstName: "merchantTestCart",
    lastName: "merchantTestCart", 
    userName: "merchantTestCart",
    email: "merchantTestCart@mail.com",
    phoneNumber: "0819208489612",
    password: "kapallawd",
    confirmPassword: "kapallawd",
    role: "merchant",
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

    describe("Test POST /api/v1.0/auth/register ", () => {
        it("Regist Should response 201", (done) => {
            // Supertest berfungsi sebagai pelaksana server
            const req = mockRequestRegistMerchantTestCart()
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

const mockRequestLoginMerchant = (body = {userName: "merchanttestcart", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let tokenMerchantTestCart = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLoginMerchant();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                tokenMerchantTestCart = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

const mockRequestCreateMerchant = (body = {name: "Merchant For Cart Test"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

const mockRequestLoginMerchantVerif = (body = {userName: "merchantcart", password: "kapallawd"}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let tokenMerchantVerif = ''

describe("Test POST /login", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequestLoginMerchantVerif();
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                console.log(res.body.token);
                tokenMerchantVerif = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});


describe("Test CREATE /merchant", () => {
    it("Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreateMerchant()
        request(app)
            .post("/api/v1.0/merchant")
            .set('Authorization', `Bearer ${tokenMerchantVerif}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(201);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});

const mockRequestProduct = (body = {
    name: "Product Biar Bisa Create Cart",
    categoryId: 1,
    description: "Product Merchant",
    price: 150000,
    stock: 20
}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

let productId1 = ''

describe('Test POST /products', () => {
    it('success create product merchant1 should return 201', (done) => {
        const req = mockRequestProduct()
        request(app)
            .post('/api/v1.0/products')
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchantVerif}`)
            .then((res) => {
                productId1 = res.body.payload.id
                expect(res.statusCode).toBe(201)
                done()
            })
    })
})


//POSITIVE CASE//
const mockRequestLogin = (body = {userName: "buyercart", password: "kapallawd"}, params = {}, query = {}) => {
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

    
let tokenBuyerForCart = ''

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
                tokenBuyerForCart = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });
});

const mockRequestCreate = (body = {productId: productId1, qty: 5}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test CREATE /cart", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestCreate()
        request(app)
            .post("/api/v1.0/cart")
            .set('Authorization', `Bearer ${tokenBuyerForCart}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});

describe("Test GET /cart", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        request(app)
            .get("/api/v1.0/cart")
            .set('Authorization', `Bearer ${tokenBuyerForCart}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});

const mockRequestGetOneCart = (body = {}, params = {id:1}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test GET one /cart/:id", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestGetOneCart();
        request(app)
            .get("/api/v1.0/cart/"+req.params.id)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                console.log(res.body);
                expect(res.status).toBe(200);
                done();
            });
    });
});

const mockRequestUpdateCart = (body = {qty:100}, params = {id:1}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
};

describe("Test PATCH /cart/:id", () => {
    it("Should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        req = mockRequestUpdateCart()
        request(app)
            .patch("/api/v1.0/cart/"+req.params.id)
            .set('Authorization', `Bearer ${tokenBuyerForCart}`)
            .send(req.body)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.status).toBe(200);
                expect(res.body.message).toBe("Success")
                done();
            });
    });
});

// NEGATIVE CASE