import { Router } from "express";
import { getAvatars } from "../controllers/avatarController";

const router = Router();

router.get("/getAllAvatars", getAvatars);

export default router;