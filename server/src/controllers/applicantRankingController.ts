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
      rank: r.rankLevel,
      comment: r.comment
    }));
    res.status(200).json({ rankings: transformed });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ message: "Failed to fetch rankings." });
  }
};

// POST /api/ranking/insertAndUpdate
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
      if (rank !== undefined) existing.rankLevel = rank;
      if (comment !== undefined) existing.comment = comment;
      await repo.save(existing);
      return res.status(200).json({ message: "Ranking updated" });
    }
    const user = await AppDataSource.getRepository(User).findOneBy({ userId });
    const application = await AppDataSource.getRepository(TutorApplication)
      .findOneBy({ applicationID: applicationId });
    if (!user || !application) {
      return res.status(404).json({ message: "User or Application not found" });
    }
    const newRanking = repo.create({
      user,
      application,
      rankLevel: rank,
      comment
    });
    await repo.save(newRanking);
    res.status(201).json({ message: "Ranking created" });
  } catch (error) {
    console.error("Error saving ranking:", error);
    res.status(500).json({ message: "Failed to save ranking" });
  }
};

// DELETE /api/ranking/delete
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

/**
 * GET /api/ranking/topTutors/:userId
 * Returns, for each course the lecturer teaches,
 * the single tutor with the highest selection count.
 */
export async function getTopTutorsByCourse(
  req: Request<{ userId: string }>,
  res: Response
): Promise<void> {
  const lecturerId = Number(req.params.userId);

  try {
    const qb = AppDataSource.getRepository(ApplicantRanking)
      .createQueryBuilder("r")
      .innerJoin("r.application", "app")
        .innerJoin(
    "courses",      // table name in the DB
    "course",       // alias
    "course.course_code = app.courseCode"
  )
     .innerJoin("r.user", "tutor")
      .innerJoin(
        "lecturer_courses",
        "lc",
        "lc.courseId = course.course_id AND lc.userId = :lecturerId",
        { lecturerId }
      )
      // pick up the app.applicationID field
      .select("course.course_id", "courseId")
      .addSelect("course.course_name", "courseName")
      .addSelect("app.applicationID", "applicationId") 
      .addSelect("CONCAT(tutor.first_name,' ',tutor.last_name)", "tutorName")
      .addSelect("COUNT(r.id)", "selectionCount")
      .addSelect(
        `ROW_NUMBER() OVER (
           PARTITION BY course.course_id
           ORDER BY COUNT(r.id) DESC
         )`,
        "rn"
      )
      .groupBy("course.course_id")
      .addGroupBy("course.course_name")  
      .addGroupBy("tutor.user_id")
      .addGroupBy("app.applicationID");    // make sure to group by the new column

    const raw = await qb.getRawMany();
    const top = (raw as any[])
      .filter(row => Number(row.rn) === 1)
      .map(row => ({
        courseId:       Number(row.courseId),
        courseName:     row.courseName,
        applicationId:  Number(row.applicationId),  // now present
        tutorName:      row.tutorName,
        selectionCount: Number(row.selectionCount),
      }));

    res.status(200).json({ data: top });
  } catch (err) {
    console.error("Error in getTopTutorsByCourse:", err);
    res.status(500).json({ message: "Unable to fetch top tutors." });
  }
}
