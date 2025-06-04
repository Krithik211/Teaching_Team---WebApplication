import { Router } from "express";
import { getAvatars } from "../controllers/avatarController";
import { getCourses } from "../controllers/courseController";

const router = Router();

router.get("/getAllAvatars", getAvatars);
router.get("/getAllCourses", getCourses);

export default router;