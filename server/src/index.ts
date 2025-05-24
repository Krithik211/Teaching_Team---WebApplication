import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [__dirname + "/entities/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to MySQL");
    app.get("/", (req, res) => {
  res.send("Backend is running and connected to MySQL!");
});
    app.listen(4000, () => {
      console.log("Server is running on http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
// sample test