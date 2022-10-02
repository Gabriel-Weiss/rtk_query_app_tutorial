const supertest = require("supertest");
const createApp = require("../../setupServer");

const app = createApp();

describe("User Controller", () => {
  describe("description: Get all users. route: GET /users", () => {
    it("should return all users", async () => {});
    it("should return users not found", async () => {});
  });
});
