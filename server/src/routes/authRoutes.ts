import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req, res) => {
  await tutorialController.save(req, res);
});

export default router;
