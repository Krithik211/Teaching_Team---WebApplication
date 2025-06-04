import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../entities/course";

export const getCourses = async (req: Request, res: Response): Promise<any> => {
  try {
    const courseRepo = AppDataSource.getRepository(Course);
    const courses = await courseRepo.find({ relations: ["positions"] });

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      message: "Failed to fetch courses",
      courses: [],
    });
  }
};