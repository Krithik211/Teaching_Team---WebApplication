import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TutorApplication } from "../entities/tutorApplication";
import { User } from "../entities/user";

export const saveApplication = async (req: Request, res: Response): Promise<any> => {
    try {
    const {
      userID,
      courseCode,
      firstName,
      lastName,
      email,
      mobile,
      course,
      position,
      availability,
      previousRole,
      skills,
      qualification,
      specialization,
    } = req.body;

    // Find the user
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { userId: userID } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create new application
    const appRepo = AppDataSource.getRepository(TutorApplication);
    const newApp = appRepo.create({
      user,
      courseCode,
      firstName,
      lastName,
      email,
      mobile,
      course,
      position,
      availability,
      previousRole,
      skills,
      qualification,
      specialization,
    });

    await appRepo.save(newApp);

    res.status(201).json({ message: "Application submitted successfully", applicationID: newApp.applicationID });
  } catch (error) {
    console.error("Error submitting tutor application:", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

export const getApplicationByUserId = async (req: Request, res: Response): Promise<any> => {
try {
     const userId = parseInt(req.params.userId, 10);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const appRepo = AppDataSource.getRepository(TutorApplication);
    const applications = await appRepo.find({
      where: { user: { userId: userId } },
      relations: ["user"], // include user details if needed
    });

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this user", applications: [] });
    }

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications by userId:", error);
    res.status(500).json({
      message: "Failed to fetch applications",
      applications: [],
    });
  }
};