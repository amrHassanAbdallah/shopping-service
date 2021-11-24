import supertest from "supertest";
import {app} from "../../server";
import {Order, OrderStatus, OrderStore} from "../../models/order";
import {Product, ProductStore} from "../../models/product";

const store = new ProductStore()

describe("Test product creation", () => {
    it("should not create", async () => {
        // Test if the test file is exist
        const obj: Product = {
            price:13,
            name:"hamda"
        }

        await expectAsync(store.create(obj)).toBeResolved()

    });

});


describe("Test product delete", () => {

    it("should delete", async () => {
        // Test if the test file is exist
        await expectAsync(store.delete("0")).toBeResolved()

    });

});




describe("Test product index", () => {

    it("should work", async () => {
        // Test if the test file is exist
        await expectAsync(store.index()).toBeResolved()

    });

});

describe("Test product show", () => {

    it("should delete", async () => {
        // Test if the test file is exist
        await expectAsync(store.show("1")).toBeResolved()

    });

});