import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import app from "../mockIndex";
import request from "supertest";
import { randomString } from "../utility/testingFunction";

beforeAll(async () => await app.ready());
afterAll(async () => await app.close());
describe("Testing API", () => {
  it("GET / Callback", async () => {
    await app.ready();
    await request(app.server)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        if (res.body.status !== true) {
          throw new Error("Response Failed");
        }

        if (res.body.message !== "Ping!") {
          throw new Error("Response Message Failed");
        }
      });
  });

  it("GET / Async Await", async () => {
    await app.ready();
    const response = await request(app.server)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("Ping!");
  });

  it("GET User", async () => {
    await app.ready();
    const response = await request(app.server)
      .get("/user?page=1&limit=10")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.status).toBe(true);
    expect(response.body.data instanceof Array).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(typeof response.body.meta.totalData === "number").toBe(true);
  });

  it("Create User", async () => {
    await app.ready();
    const random = await randomString(7);
    const response = await request(app.server)
      .post("/register")
      .send({
        name: "Mr. Specter " + random,
        email: random + "@gmail.com",
        password: "mrc201",
        role: "ADMIN",
      })
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body.status).toBe(true);
  });
});
