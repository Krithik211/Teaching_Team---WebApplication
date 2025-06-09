describe("Application Controller", () => {
  it("should submit a new tutor application", async () => {
    const res = await request(app).post("/api/application/submit").send({
      userID: 1,
      courseCode: "COSC2758",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      course: "Full Stack",
      position: "Tutor",
      availability: ["Monday", "Wednesday"],
      previousRole: "TA",
      skills: "React, Node",
      qualification: "MSc CS",
      specialization: "Web Dev",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Application submitted successfully");
  });
});
