import request from "supertest";
import app from "../index"; // Assuming Express app is exported from here

describe("Auth Controller - Sign Up", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "securePass123",
    });

    expect(res.statusCode).toBe(201); // Test for successful creation
    expect(res.body.message).toBe("User registered successfully");
  });
});

describe("Auth Controller - Login Failure", () => {
  it("should not log in with invalid password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "wrongPassword",
    });

    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.message).toBe("Invalid email or password");
  });
});