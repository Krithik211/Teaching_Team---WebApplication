import { Router } from "express";
import { deleteRanking, getRankingsByUser, insertAndUpdateRanking, getTopTutorsByCourse  } from "../controllers/applicantRankingController";


const router = Router();

router.get("/getExistingRanking/:userId", getRankingsByUser);
router.get("/topTutors/:userId", getTopTutorsByCourse);  // ← new
router.post("/insertAndUpdate", insertAndUpdateRanking);
router.delete("/delete", deleteRanking);
export default router;