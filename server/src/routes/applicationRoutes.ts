import { Router } from "express";
import { saveApplication, getApplicationByUserId, updateTutorApplication, getApplicationsByLecturer, getAllApplications } from "../controllers/applicationController";

const router = Router();

router.post("/saveApplication", saveApplication);
router.get("/getApplicationByUserId/:userId", getApplicationByUserId);
router.put("/updateApplication",updateTutorApplication);
router.get("/getApplicationsByLecturer/:lecturerId", getApplicationsByLecturer);
router.get("/allApplication", getAllApplications);

export default router;