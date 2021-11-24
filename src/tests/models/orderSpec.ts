import supertest from "supertest";
import {app} from "../../server";
import {Order, OrderStatus, OrderStore} from "../../models/order";

const request = supertest(app);
const store = new OrderStore()

describe("Test orders creation", () => {

    it("should not create", async () => {
        // Test if the test file is exist
        const obj: Order = {
            products: [],
            status: OrderStatus.Active,
            user_id: 0,
        }

        await expectAsync(store.create(obj)).toBeRejected()

    });

});
describe("Test order delete", () => {
    it("should work", async () => {
        await expectAsync(store.delete("0")).toBeResolved()

    });

});
describe("Test users orders", () => {

    it("should work", async () => {
        await expectAsync(store.getUserOrders("0")).toBeResolved()

    });

});