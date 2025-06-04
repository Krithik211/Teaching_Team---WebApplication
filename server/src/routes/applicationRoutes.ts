import { Router } from "express";
import { saveApplication, getApplicationByUserId } from "../controllers/applicationController";

const router = Router();

router.post("/saveApplication", saveApplication);
router.get("/getApplicationByUserId/:userId", getApplicationByUserId);

export default router;