import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import cors from "cors";

const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
