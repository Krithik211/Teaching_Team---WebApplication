describe("Course Controller", () => {
  it("should return all courses", async () => {
    const res = await request(app).get("/api/course/get");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Course Controller", () => {
  it("should fail if course data is incomplete", async () => {
    const res = await request(app).post("/api/course/add").send({
      courseCode: "COSC2938",
      // missing courseName or semester
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid course data");
  });
});