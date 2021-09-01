const request = require("supertest");
const app = require("../index");

describe("Todos API", () => {
  it("GET / ---> array of todos", () => {
    return request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              active: expect.any(Boolean),
            }),
          ])
        );
      });
  });
});