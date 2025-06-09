
import { User } from "../entity/User";
import { Course } from "../entity/Course";
import { LecturerCourse } from "../entity/LecturerCourse";
import { CoursePosition } from "../entity/CoursePosition";
import { ApplicantRanking } from "../entity/ApplicantRanking";
import { relative } from "path";
import { TutorApplication } from "../entity/tutorApplications";

export const resolvers = {
  Query: {
    users: async () => await User.find(), user: async (_: any, { id }: { id: number }) =>
      await User.findOneBy({ id }),
    coursePositions: async () => CoursePosition.find(),
    getCourses: async () => {
      const courses = await Course.find();
      console.log("Fetched courses:", courses); // Add this for debugging
      return courses;
    },
    getAllAssignedLecturers: async () => {
      return await LecturerCourse.find({
        relations: ["lecturer", "course"]
      })
    },
    getAllApplicantsRanking: async () => {
      const rankings = await ApplicantRanking.find({ relations: ["application"] });
      //const rankingList =  rankings.map((r) => r.application);
      // rankings.forEach(r => {
      //   console.log(r.application);
      // });
      return rankings.map((r) => r.application);
    },

    getAllApplicantions: async () => {
      return await TutorApplication.find()
    }

  },

  Mutation: {
    addCourse: async (
      _: any,
      { courseName, courseCode, semester, positionIds, }: { courseName: string; courseCode: string; semester: number, positionIds: number[]; }
    ) => {
      const pos = await CoursePosition.findByIds(positionIds);
      const newCourse = Course.create({ courseName, courseCode, semester, positions: pos, });
      return await newCourse.save();
    },

    updateCourse: async (_: any, { id, courseName, courseCode, semester, positionIds }: { id: number, courseName: string, courseCode: string, semester: number, positionIds: number[]; }) => {
      const course = await Course.findOneBy({ id });
      if (!course) throw new Error("Course not found");
      course.courseName = courseName;
      course.courseCode = courseCode;
      course.semester = semester;
      course.positions = await CoursePosition.findByIds(positionIds);
      return await course.save();
    },
    assignLecturerToCourse: async (_: any, { lecturerId, courseId, semester }: { lecturerId: number; courseId: number; semester: number }) => {
      const lecturer = await User.findOneBy({ id: lecturerId });
      const course = await Course.findOneBy({ id: courseId });

      if (!lecturer || !course) {
        throw new Error("Lecturer or Course not found");
      }

      const assignment = LecturerCourse.create({
        lecturer,
        course,
        semester,
      });

      return await assignment.save();
    },

    blockUser: async (_: any, { userId }: { userId: number }) => {
      const user = await User.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");
      user.isBlocked = true;
      await user.save();
      return "User blocked.";
    },
    unblockUser: async (_: any, { userId }: { userId: number }) => {
      const user = await User.findOneBy({ id: userId });
      if (!user) throw new Error("User not found");
      user.isBlocked = false;
      await user.save();
      return "User unblocked.";
    },



    deleteCourse: async (_: any, { id }: { id: number }) => {
      const result = await Course.delete(id);
      return result.affected === 1;
    },
  },

};
