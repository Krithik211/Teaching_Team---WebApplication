import { Router } from "express";
import { saveApplication, getApplicationByUserId, updateTutorApplication } from "../controllers/applicationController";

const router = Router();

router.post("/saveApplication", saveApplication);
router.get("/getApplicationByUserId/:userId", getApplicationByUserId);
router.put("/updateApplication",updateTutorApplication);

export default router;