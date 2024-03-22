const request = require("supertest");
const app = require("../app");
const productEndpoint = "/api/v1.0/products"

const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
    };
}


//* MOCK REGISTER 
describe("Test POST /api/v1.0/user ", () => {
    it("Register Buyer Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "buyer1",
            lastName: "buyer1",
            userName: "buyer1",
            email: "buyer1@mail.com",
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
        }
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

    it("Register Merchant1 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "merchant1",
            lastName: "merchant1",
            userName: "merchant1",
            email: "merchant1@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "merchant",
            isActive: true,
            address: [
                {
                    "address": "jogja",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
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

    it("Register Merchant2 Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "merchant2",
            lastName: "merchant2",
            userName: "merchant2",
            email: "merchant2@mail.com",
            phoneNumber: "0819208489613",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "merchant",
            isActive: true,
            address: [
                {
                    "address": "Semarang",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
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

    it("Register Admin Should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            firstName: "admin1",
            lastName: "admin1",
            userName: "admin1",
            email: "admin1@mail.com",
            phoneNumber: "0819208489612",
            password: "kapallawd",
            confirmPassword: "kapallawd",
            role: "admin",
            isActive: true,
            address: [
                {
                    "address": "Jakarta",
                    "name": "office",
                    "isUsed": true
                }
            ]
        }
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

// * VARIABLES //
let tokenBuyer = ''
let tokenMerchant1 = ''
let tokenMerchant2 = ''
let tokenAdmin = ''
let productId1
let productId2

// * MOCK LOGIN BUYER
describe("Test POST /login", () => {
    it("Buyer login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'buyer1'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenBuyer = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Merchant1 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchant1'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenMerchant1 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Merchant2 login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'merchant2'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenMerchant2 = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

    it("Admin login should response 200", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest();
        req.body.userName = 'admin1'
        req.body.password = 'kapallawd'
        request(app)
            .post("/api/v1.0/auth/login")
            .send(req.body)
            .set('Accept', 'application/json')
            .then((res) => {
                tokenAdmin = res.body.token
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(200);
                done();
            });
    });

});


// * MOCK UPGRADE TO CREATE MERCHANT
describe("Test POST /api/v1.0/merchant ", () => {
    it("Register new Merchant2 should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            name: "Toko Merchant 1"
        }
        request(app)
            .post("/api/v1.0/merchant")
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(201);
                done();
            });
    });

    it("Register new Merchant2 should response 201", (done) => {
        // Supertest berfungsi sebagai pelaksana server
        const req = mockRequest()
        req.body = {
            name: "Toko Merchant 2"
        }
        request(app)
            .post("/api/v1.0/merchant")
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .then((res) => {
                // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
                expect(res.statusCode).toBe(201);
                done();
            });
    });
});

// * ADMIN CREATE NEW CATEGORY
describe('Test POST /category', () => {
    it('must return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "category1"
        }
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

describe('Test POST /products', () => {
    it('success create product merchant1 should return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "Product Merchant1",
            category: "category1",
            description: "Product Merchant 1 udah itu aa",
            price: 150000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                productId1 = res.body.payload.id
                console.log("Product Id M 1 From Create ==> ", res.body)
                expect(res.statusCode).toBe(201)
                done()
            })
    })

    it('success create product merchant2 should return 201', (done) => {
        const req = mockRequest()
        req.body = {
            name: "Product Merchant 2",
            category: "category1",
            description: "Product Merchant 2 udah itu aa",
            price: 150000,
            stock: 20
        }
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .then((res) => {
                productId2 = res.body.payload.id
                console.log("ID PRODUCT 2 ==>", productId2);
                expect(res.statusCode).toBe(201)
                done()
            })
    })

    const req = mockRequest()
    req.body = {
        name: "Product non-Merchant",
        category: "category1",
        description: "Product non-Merchant udah itu aa",
        price: 150000,
        stock: 20
    }

    it('failed unauthenticated user create new product should return 401', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer create new product should return 403', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin create new product should return 403', (done) => {
        request(app)
            .post(productEndpoint)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

})

describe('TEST PUT /products/:id', () => {
    const req = mockRequest()
    req.body = {
        name: "Product Merchant 1 updated",
    }
    it('success update product should return 200', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .send(req.body)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed unauthenticated user update product should return 401', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed unauthorized merchant update product should return 403', (done) => {
        request(app)
            .put(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenMerchant2}`)
            .send(req.body)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })
})

describe('TEST DELETE /products/:id', () => {
    it('success delete product should return 200', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed unauthenticated user delete product should return 401', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                done()
            })
    })

    it('failed buyer delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenBuyer}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed admin delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId1}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })

    it('failed unauthorized merchant delete product should return 403', (done) => {
        request(app)
            .delete(`${productEndpoint}/${productId2}`)
            .set('Authorization', `Bearer ${tokenMerchant1}`)
            .then((res) => {
                expect(res.statusCode).toBe(403)
                done()
            })
    })
})

describe('TEST GET /products', () => {
    it('fetch all products should return 200', (done) => {
        request(app)
            .get(productEndpoint)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })
})
const { v4: uuidv4 } = require('uuid');
let randomUUID = uuidv4()

describe('TEST GET products/:id', () => {
    it('success fetch product by product id should return 200', (done) => {
        request(app)
            .get(`${productEndpoint}/${productId2}`)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                done()
            })
    })

    it('failed fetch if product id not found should return 404', (done) => {
        request(app)
            .get(`${productEndpoint}/${randomUUID}`)
            .then((res) => {
                expect(res.statusCode).toBe(404)
                done()
            })
    })
})


// //* NEGATIVE CASE //
// // NO AUTHENTICATION //
// describe('Test Products Route without Authentication', () => {
//     const req = mockRequest()
//     req.params.id = 25

//     it(`GET /products/:id should return 404 if product doesn't exist`, (done) => {
//         request(app)
//             .get(`${productEndpoint}/` + req.params.id)
//             .then((res) => {
//                 expect(res.statusCode).toBe(404)
//                 done()
//             })
//     })
//     it('POST /products should return 401', (done) => {
//         req.body = {
//             name: "PS 5 Baru",
//             category: "teknologi",
//             description: "PS 5 udah itu aja",
//             price: 15000000,
//             stock: 20
//         }
//         request(app)
//             .post(productEndpoint)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.status).toBe(401)
//                 done()
//             })
//     })
//     it('PUT /products should return 401', (done) => {
//         request(app)
//             .put(`${productEndpoint}/` + req.params.id)
//             .then((res) => {
//                 expect(res.status).toBe(401)
//                 done()
//             })
//     })
//     it('DELETE /products should return 401', (done) => {
//         request(app)
//             .delete(`${productEndpoint}/` + req.params.id)
//             .then((res) => {
//                 expect(res.status).toBe(401)
//                 done()
//             })
//     })
// })

// // LOGIN AS A BUYER
// let token = ''

// describe("Test POST /login", () => {
//     it("Should response 200", (done) => {
//         // Supertest berfungsi sebagai pelaksana server
//         const req = mockRequest();
//         req.body.userName = 'muhammad'
//         req.body.password = 'kapallawd'
//         request(app)
//             .post("/api/v1.0/auth/login")
//             .send(req.body)
//             .set('Accept', 'application/json')
//             .then((res) => {
//                 console.log(res.body.token);
//                 token = res.body.token
//                 // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
//                 expect(res.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

// // AUTHENTICATION WITH NO AUTHORIZE
// describe('Test Product Route With Authentication and No Authorization', () => {
//     it('POST /products should return 403', (done) => {
//         const req = mockRequest()
//         req.body = {
//             name: "PS 5 Baru",
//             category: "teknologi",
//             description: "PS 5 udah itu aja",
//             price: 15000000,
//             stock: 20
//         }
//         request(app)
//             .post(productEndpoint)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })
//     it('PUT /products should return 403', (done) => {
//         const req = mockRequest()
//         req.params.id = 1
//         const productId = req.params.id
//         request(app)
//             .put(`${productEndpoint}/` + productId)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })
//     it('DELETE /products should return 401', (done) => {
//         const req = mockRequest()
//         req.params.id = 1
//         const productId = req.params.id
//         request(app)
//             .delete(`${productEndpoint}/` + productId)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(403)
//                 done()
//             })
//     })
// })

// // LOGIN AS MERCHANT //
// describe("Test POST /login", () => {
//     it("Should response 200", (done) => {
//         // Supertest berfungsi sebagai pelaksana server
//         const req = mockRequest();
//         req.body.userName = 'merchant'
//         req.body.password = 'kapallawd'
//         request(app)
//             .post("/api/v1.0/auth/login")
//             .send(req.body)
//             .set('Accept', 'application/json')
//             .then((res) => {
//                 console.log(res.body.token);
//                 token = res.body.token
//                 // Jest berfungsi sebagai matchers => Tolak ukur apakah responsenya sesuai atau tidak
//                 expect(res.statusCode).toBe(200);
//                 done();
//             });
//     });
// });

// // AUTHORIZED MERCHANT WITH NON EXIST CATEGORY
// describe('User authorized and category not found', () => {
//     const req = mockRequest()
//     req.body = {
//         name: "PS 5 Baru",
//         category: "teknologgi",
//         description: "PS 5 udah itu aja",
//         price: 15000000,
//         stock: 20
//     }
//     it('POST /products should return 404', (done) => {
//         request(app)
//             .post(productEndpoint)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.statusCode).toBe(404);
//                 done();
//             })
//     })
// })

// // UNAUTHORIZED MERCHANT TO MANIPULATE PRODUCTS
// describe('User is authorized but no access to other merchant product', () => {
//     const req = mockRequest()
//     req.params.id = 4
//     req.body = {
//         name: "PS 5 Baru Banget",
//         description: "PS 5 udah itu aja",
//         price: 15000000,
//         stock: 20
//     }

//     it('PUT /products/:id should return 403', (done) => {
//         request(app)
//             .put(`${productEndpoint}/${req.params.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.statusCode).toBe(403);
//                 done();
//             })
//     })
//     it('DELETE /products/:id should return 403', (done) => {
//         request(app)
//             .delete(`${productEndpoint}/${req.params.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.statusCode).toBe(403);
//                 done();
//             })
//     })
// })

// // * POSITIVE CASE //
// // UNAUTHENTICATED USER TO FETCH PRODUCTS
// describe('User access to see product and product details', () => {
//     it('GET /products should return 200', (done) => {
//         request(app)
//             .get(productEndpoint)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//                 done();
//             })
//     })
//     it('GET /products/:id should return 200 if product id is exists', (done) => {
//         const req = mockRequest()
//         req.params.id = 4
//         request(app)
//             .get(`${productEndpoint}/${req.params.id}`)
//             .then((res) => {
//                 expect(res.statusCode).toBe(200);
//                 done();
//             })
//     })
// })

// // AUTHENTICATED AND AUTHORIZED MERCHANT TO MANIPULATE PRODUCTS
// describe('Authorized Merchant Manipulate Products', () => {
//     const req = mockRequest()
//     req.body = {
//         name: "Kabel PS 5",
//         category: "teknologi",
//         description: "Kabel PS 5 udah itu aja",
//         price: 15000,
//         stock: 200
//     }
//     req.params.id = 1
//     it('POST /products should return 201', (done) => {
//         request(app)
//             .post(productEndpoint)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 console.log(res.body)

//                 expect(res.status).toBe(201)
//                 done()
//             })
//     })
//     it('PUT /products/:id should return 200', (done) => {
//         delete req.body.category
//         request(app)
//             .put(`${productEndpoint}/${req.params.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .send(req.body)
//             .then((res) => {
//                 expect(res.status).toBe(200)
//                 done()
//             })

//     })
//     it('DELETE /products/:id should return 200', (done) => {
//         request(app)
//             .delete(`${productEndpoint}/${req.params.id}`)
//             .set('Authorization', `Bearer ${token}`)
//             .then((res) => {
//                 expect(res.status).toBe(200)
//                 done()
//             })
//     })
// })

