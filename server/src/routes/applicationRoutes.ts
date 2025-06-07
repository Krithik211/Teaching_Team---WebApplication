import { Router } from "express";
import { saveApplication, getApplicationByUserId, updateTutorApplication, getApplicationsByLecturer } from "../controllers/applicationController";

const router = Router();

router.post("/saveApplication", saveApplication);
router.get("/getApplicationByUserId/:userId", getApplicationByUserId);
router.put("/updateApplication",updateTutorApplication);
router.get("/getApplicationsByLecturer/:lecturerId", getApplicationsByLecturer);

export default router;