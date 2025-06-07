import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Course } from "./course";
import { LecturerCourse } from "./lectureCourses";

@Entity("semesters")
export class Semester {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "semester_name", unique: true })
  semesterName!: string;

  @OneToMany(() => Course, (course) => course.semester)
  courses!: Course[];

  @OneToMany(() => LecturerCourse, (lc) => lc.semester)
  lecturerCourses!: LecturerCourse[];
}