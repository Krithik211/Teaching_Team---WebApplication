
import { User } from "../entity/User";
import { Course } from "../entity/Course";
import { LecturerCourse } from "../entity/LecturerCourse";

export const resolvers = {
  Query: {
    users: async () => await User.find(), user: async (_: any, { id }: { id: number }) =>
      await User.findOneBy({ id }),
    getCourses: async () => {
      const courses = await Course.find();
      console.log("Fetched courses:", courses); // Add this for debugging
      return courses;
    },
    getAllAssignedLecturers: async() =>{
      return await LecturerCourse.find({
        relations: ["lecturer", "course"]
      })
    }
  },

  Mutation: {
    addCourse: async (
      _: any,
      { courseName, courseCode, semester }: { courseName: string; courseCode: string ; semester:number}
    ) => {
      const newCourse = Course.create({ courseName, courseCode, semester });
      return await newCourse.save();
    },

    updateCourse: async (_: any, { id, courseName, courseCode, semester }: { id: number, courseName: string, courseCode: string , semester: number}) => {
      const course = await Course.findOneBy({ id });
      if (!course) throw new Error("Course not found");
      course.courseName = courseName;
      course.courseCode = courseCode;
      course.semester = semester;
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
