import supertest from "supertest";
import fs from "fs";
import path from "path";
import {app} from "../../server";


const request = supertest(app);

describe("Test products listing", () => {
  it("should return 200 even if there is no record", async (done) => {
    // Test if the test file is exist
    request
      .get("/products/")
      .expect(200)
      .end((error) => (error ? done.fail(error) : done()));
  });
});
describe("Test products creation", () => {
  it("should return 403 when there is no auth", async (done) => {
    // Test if the test file is exist
    request
        .post("/products/")
        .expect(403)
        .end((error) => (error ? done.fail(error) : done()));
  });
});
