import { Router } from "express";
import { deleteRanking, getRankingsByUser, insertAndUpdateRanking } from "../controllers/applicantRankingController";

const router = Router();

router.get("/getExistingRanking/:userId", getRankingsByUser);
router.post("/insertAndUpdate", insertAndUpdateRanking);
router.delete("/delete", deleteRanking);
export default router;