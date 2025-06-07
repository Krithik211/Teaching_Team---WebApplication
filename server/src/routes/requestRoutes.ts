import { Router } from "express";
import { getAvatars } from "../controllers/avatarController";
import { getCourses, getLecturerCourses } from "../controllers/courseController";

const router = Router();

router.get("/getAllAvatars", getAvatars);
router.get("/getAllCourses", getCourses);
router.get("/getLecturerCourses/:lecturerId", getLecturerCourses);

export default router;