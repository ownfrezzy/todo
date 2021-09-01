const request = require("supertest");
const app = require("./index");

describe("Todos API", () => {
  it("GET /api/todo/ ---> array of todos", () => {
    return request(app)
      .get("/api/todo")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: expect.any(String),
                active: expect.any(Boolean),
            })
        ]));
      });
  });
});
