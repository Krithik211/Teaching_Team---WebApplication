import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser); // <-- Required for sign-up

export default router;
