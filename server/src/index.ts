import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import avatarRoutes from './routes/avatarRoutes';

dotenv.config();
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use("/api/auth", authRoutes);
    app.use("/api/request", avatarRoutes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );