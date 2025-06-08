import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";

@Entity({ name: "Lecturer_Course" })
export class LecturerCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lecturerId!: number;

  @Column()
  courseId!: number;

  @Column({name: "semesterId"})
  semester!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "lecturerId" })
  lecturer!: User;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "courseId" })
  course!: Course;
}
