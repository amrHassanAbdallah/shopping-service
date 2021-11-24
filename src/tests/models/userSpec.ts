import supertest from "supertest";
import {app} from "../../server";
import {Order, OrderStatus, OrderStore} from "../../models/order";
import {Product, ProductStore} from "../../models/product";
import {User, UserStore} from "../../models/user";

const store = new UserStore()

describe("Test user creation", () => {
    it("should not create", async () => {
        // Test if the test file is exist
        const obj: User = {
            password:"123",
            username:"123"
        }

        await expectAsync(store.create(obj)).toBeRejected()
    });

});


describe("Test user delete", () => {

    it("should delete", async () => {
        // Test if the test file is exist
        await expectAsync(store.delete("0")).toBeResolved()

    });

});




describe("Test user index", () => {

    it("should work", async () => {
        // Test if the test file is exist
        await expectAsync(store.index()).toBeResolved()

    });

});

describe("Test user show", () => {

    it("should show", async () => {
        // Test if the test file is exist
        await expectAsync(store.show("1")).toBeResolved()

    });

});

describe("Test my orders", () => {

    it("should work", async () => {
        // Test if the test file is exist
        await expectAsync(store.show("1")).toBeResolved()

    });

});

describe("check the auth", () => {

    it("should work", async () => {
        // Test if the test file is exist
        await expectAsync(store.authenticate(Date.now().toString(),"sss")).toBeRejected()

    });

})