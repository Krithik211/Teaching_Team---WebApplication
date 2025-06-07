import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ApplicantRanking } from "../entities/applicantRanking";
import { User } from "../entities/user";
import { TutorApplication } from "../entities/tutorApplication";

// GET /api/rankings/:userId
export const getRankingsByUser = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;

  try {
    const repo = AppDataSource.getRepository(ApplicantRanking);

    const rankings = await repo.find({
      where: { user: { userId: Number(userId) } },
      relations: ["application"]
    });

    const transformed = rankings.map(r => ({
      applicationId: r.application.applicationID,
      rank: r.rank,
      comment: r.comment
    }));

    res.status(200).json({ rankings: transformed });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ message: "Failed to fetch rankings." });
  }
};

export const insertAndUpdateRanking = async (req: Request, res: Response): Promise<any> => {
  const { userId, applicationId, rank, comment } = req.body;

  if (!userId || !applicationId) {
    return res.status(400).json({ message: "Missing userId or applicationId" });
  }

  try {
    const repo = AppDataSource.getRepository(ApplicantRanking);
    const existing = await repo.findOne({
      where: {
        user: { userId },
        application: { applicationID: applicationId }
      },
      relations: ["user", "application"]
    });

    if (existing) {
      if (rank !== undefined) existing.rank = rank;
      if (comment !== undefined) existing.comment = comment;
      await repo.save(existing);
      return res.status(200).json({ message: "Ranking updated" });
    }

    const user = await AppDataSource.getRepository(User).findOneBy({ userId });
    const application = await AppDataSource.getRepository(TutorApplication).findOneBy({ applicationID: applicationId });

    if (!user || !application) {
      return res.status(404).json({ message: "User or Application not found" });
    }

    const newRanking = repo.create({
      user,
      application,
      rank,
      comment
    });

    await repo.save(newRanking);
    res.status(201).json({ message: "Ranking created" });

  } catch (error) {
    console.error("Error saving ranking:", error);
    res.status(500).json({ message: "Failed to save ranking" });
  }
};

export const deleteRanking = async (req: Request, res: Response): Promise<any> => {
  const { userId, applicationId } = req.body;

  try {
    const repo = AppDataSource.getRepository(ApplicantRanking);
    const existing = await repo.findOne({
      where: {
        user: { userId },
        application: { applicationID: applicationId }
      },
      relations: ["user", "application"]
    });

    if (!existing) {
      return res.status(404).json({ message: "Ranking not found" });
    }

    await repo.remove(existing);
    return res.status(200).json({ message: "Ranking deleted" });
  } catch (error) {
    console.error("Failed to delete ranking:", error);
    res.status(500).json({ message: "Server error while deleting" });
  }
};

// export const deleteRanking = async (req: Request, res: Response): Promise<any> => {
//   const { userId, applicationId } = req.body;

//   if (!userId || !applicationId) {
//     return res.status(400).json({ message: "Missing userId or applicationId" });
//   }

//   try {
//     const repo = AppDataSource.getRepository(ApplicantRanking);
//     const existing = await repo.findOne({
//       where: {
//         user: { userId },
//         application: { applicationID: applicationId }
//       },
//       relations: ["user", "application"]
//     });

//     if (!existing) {
//       return res.status(404).json({ message: "Ranking not found" });
//     }

//     await repo.remove(existing);
//     return res.status(200).json({ message: "Ranking deleted" });
//   } catch (error) {
//     console.error("Delete ranking error:", error);
//     return res.status(500).json({ message: "Failed to delete ranking" });
//   }
// };