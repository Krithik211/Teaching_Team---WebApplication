import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";

@Entity({ name: "lecturer_courses" })
export class LecturerCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: "userId"})
  lecturerId!: number;

  @Column({name: "courseId"})
  courseId!: number;

  @Column({name: "semesterId"})
  semester!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  lecturer!: User;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course!: Course;
}
