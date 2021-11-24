import supertest from "supertest";
import {app} from "../server";
import {AuthUserResponse} from "./productsSpec";
import orders from "../handlers/orders";


const request = supertest(app);

describe("Test orders creation", () => {
    let authorizedUser: AuthUserResponse | null = null;
    let orderID: string = ""
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

    afterAll(() => {
        if (authorizedUser) {
            request.delete("/orders/" + orderID).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
            request.delete("/users/" + authorizedUser.id).set('Authorization', 'Bearer ' + authorizedUser.token).expect(204)
        }
    });
    it("should return 403 when there is no auth", async () => {
        // Test if the test file is exist
        request
            .post("/orders/")
            .expect(401)
    });

    it("should fail when passing invalid payload", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
            .post("/orders/")
            .set('Authorization', 'Bearer ' + authorizedUser.token)
            .expect(400)

    });
    it("should create ", async () => {
        if (authorizedUser == null) {
            return fail("a user is required to pass this test")
        }
        // Test if the test file is exist
        request
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
            .expect(201)
            .expect((response) => {
                orderID = response.body.id
                })

    });
});

;
