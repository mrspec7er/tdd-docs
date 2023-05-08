import { palindrome, randomString } from "../utility/testingFunction";
import { describe, expect, it } from "@jest/globals";

describe("Function Test", () => {
  it("Testing palindrome true odd", async () => {
    expect(await palindrome("katak")).toBe(true);
  });

  it("Testing palindrome true even", async () => {
    expect(await palindrome("asddsa")).toBe(true);
  });

  it("Testing palindrome false", async () => {
    expect(await palindrome("nonpalindrome")).toEqual(false);
  });

  it("Testing palindrome false even", async () => {
    expect(await palindrome("no0n")).toEqual(false);
  });

  it("Testing palindrome true long", async () => {
    expect(await palindrome("qwertyuiopoiuytrewq")).toEqual(true);
  });
});

describe("Core API", () => {
  it("Generate random string", async () => {
    const result = await randomString(3.5);

    expect(result).toHaveLength(Math.floor(3.5) * 2);
  });

  it("Generate random string", async () => {
    try {
      await randomString(0);
    } catch (err: any) {
      expect(err.message).toBe("Number cannot less that 1");
    }
  });
});

// beforeAll(async () => await app.ready());
// afterAll(async () => await app.close());
// describe("Testing API", () => {
//   it("GET /", async () => {
//     await app.ready();
//     await request(app.server)
//       .get("/")
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .expect((res) => {
//         if (res.body.status !== true) {
//           throw new Error("Response Failed");
//         }

//         if (res.body.message !== "Ping!") {
//           throw new Error("Response Message Failed");
//         }
//       });
//   });

//   it("GET /api", async () => {
//     await app.ready();
//     const response = await request(app.server)
//       .get("/")
//       .expect(200)
//       .expect("Content-Type", /json/);

//     expect(response.body.status).toBe(true);
//     expect(response.body.message).toBe("Ping!");
//   });
// });
