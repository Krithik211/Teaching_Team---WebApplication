import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { Course } from "./course";
import { Semester } from "./semester";

@Entity("lecturer_courses")
export class LecturerCourse {
  @PrimaryGeneratedColumn()
  id!: number;

@ManyToOne(() => User, u => u.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'userId' })
lecturer!: User;

@ManyToOne(() => Course, c => c.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'courseId' })
course!: Course;

@ManyToOne(() => Semester, s => s.lecturerCourses, { onDelete: 'RESTRICT' })
@JoinColumn({ name: 'semesterId' })
semester!: Semester;
}