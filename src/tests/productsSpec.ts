import supertest from "supertest";
import {app} from "../server";


const request = supertest(app);

export type AuthUserResponse = {
    id?: string;
    username: string;
    password: string;
    first_name?: string;
    last_name?: string;
    token?: string;
}
describe("Test products listing", () => {
    it("should return 200 even if there is no record", async () => {
        // Test if the test file is exist
        request
            .get("/products/")
            .expect(200)
    });
});
describe("Test products creation", () => {
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
    it("should return 403 when there is no auth", async () => {
        // Test if the test file is exist
        request
            .post("/products/")
            .expect(401)
    });

    it("should fail when passing invalid payload", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .post("/products/")
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .expect(400)

    });
    it("should create a product", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .post("/products/")
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .send({
                "name":"hamda",
                "price":12.25
            })
            .expect(201)

    });
});
describe("Test product delete", () => {
    let authorizedUser: AuthUserResponse | null = null;
    let productId: string = "";

    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body
            if (authorizedUser ==null){
                return fail("failed to parse created user response")
            }
            let response = await request
                .post("/products/")
                .set('Authorization', 'Bearer ' + authorizedUser.token)
                .send({
                    "name":"hamda",
                    "price":12.25
                })
            productId = response.body.id
        } else {
            fail()
        }
    });

    afterAll( () => {
        if (authorizedUser) {
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });

    it("should delete a product", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .delete("/products/"+productId)
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .expect(201)
    });
});
describe("Test product show", () => {
    let authorizedUser: AuthUserResponse | null = null;
    let productId: string = "";

    beforeAll(async () => {
        let data = await request.post("/users/").send({
            "first_name": "hamda",
            "last_name": "hamda",
            "username": Date.now().toString(),
            "password": "hamda",
        })
        if (data.ok) {
            authorizedUser = data.body
            if (authorizedUser ==null){
                return fail("failed to parse created user response")
            }
            let response = await request
                .post("/products/")
                .set('Authorization', 'Bearer ' + authorizedUser.token)
                .send({
                    "name":"hamda",
                    "price":12.25
                })
            productId = response.body.id
        } else {
            fail()
        }
    });

    afterAll( () => {
        if (authorizedUser) {
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
            request
                .delete("/products/"+productId)
                .set('Authorization', 'Bearer ' + authorizedUser.token)
                .expect(201)
        }
    });

    it("should get a product", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .get("/products/"+productId)
            .expect(200)

    });
});
