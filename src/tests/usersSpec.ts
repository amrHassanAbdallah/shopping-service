import supertest from "supertest";
import {app} from "../server";
import {AuthUserResponse} from "./productsSpec";
import {Order} from "../models/order";
import orders from "../handlers/orders";


const request = supertest(app);

describe("Test products listing", () => {
    let authorizedUser: AuthUserResponse | null = null;
    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body
        } else {
            fail()
        }
    });

    afterAll( () => {
        if (authorizedUser) {
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });

    it("should fail when there is no auth", async () => {
        // Test if the test file is exist
        request
            .get("/users/")
            .expect(401)
    });
    it("should return a user", async () => {
        if (authorizedUser == null){
            return fail()
        }
        // Test if the test file is exist
        request
            .get("/users/")
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .expect(200)
    });
});
describe("Test user creation", () => {
    let authorizedUser: AuthUserResponse | null = null;

    afterAll( () => {
        if (authorizedUser) {
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });
    it("should return 403 when there is no auth", async () => {
        // Test if the test file is exist
        request
            .post("/users/")
            .expect(401)
    });

    it("should fail when passing invalid payload", async () => {

        request
            .post("/users/")
            .expect(400)

    });

    it("should create ", async () => {
        request
            .post("/users/")
            .send({
                "username":Date.now().toString(),
                "password":"hamda",
                "first_name":"kk",
                "last_name":"kk"
            })
            .expect(201)

    });
});
describe("Test product delete", () => {
    let authorizedUser: AuthUserResponse | null = null;

    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body

        } else {
            fail()
        }
    });


    it("should delete a product", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .delete("/users/"+authorizedUser.id)
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .expect(201)
    });
});

describe("Test show", () => {
    let authorizedUser: AuthUserResponse | null = null;

    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body
        } else {
            fail()
        }
    });

    afterAll( () => {
        if (authorizedUser) {
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });

    it("should get a product", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .get("/users/"+authorizedUser.id)
            .expect(200)

    });
});


describe("Test my orders", () => {
    let authorizedUser: AuthUserResponse | null = null;
    let order:Order |null ;

    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body
            if (authorizedUser == null) {
                return fail("failed to parse created user response")
            }
            let response = await request
                .post("/orders/")
                .set('Authorization', 'Bearer ' + authorizedUser.token)
                .send({
                    "products": [
                        {
                            "id": 1,
                            "quantity": 5
                        },
                        {
                            "id": 2,
                            "quantity": 5
                        }
                    ]
                })
            order = response.body
        } else {
            fail()
        }
    });

    afterAll(() => {
        if (authorizedUser) {
            if (order){
                request.delete("/orders/" + order.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
            }
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });

    it("should list orders", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .get("/users/" + authorizedUser.id+"/orders")
            .expect(200)
            .expect((response) => {
                expect(response.body[0]).toEqual(order);
            })

    });
})