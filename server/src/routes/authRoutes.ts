import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { getAvatars } from "../controllers/avatarController";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser); // <-- Required for sign-up
router.get("/avatars", getAvatars);

export default router;
