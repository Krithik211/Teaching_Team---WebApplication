describe("Ranking Controller", () => {
  it("should insert a ranking for a tutor", async () => {
    const res = await request(app).post("/api/ranking/insert").send({
      userID: 2,
      applicationID: 101,
      rank: "Top Choice",
      comment: "Excellent experience",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ranking saved");
  });
});
