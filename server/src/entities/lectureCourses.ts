import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user";
import { Course } from "./course";
import { Semester } from "./semester";

@Entity("lecturer_courses")
export class LecturerCourse {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.lecturerCourses, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  lecturer!: User;

  @ManyToOne(() => Course, (course) => course.lecturerCourses, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  course!: Course;

  @ManyToOne(() => Semester, (semester) => semester.lecturerCourses, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  semester!: Semester;
}