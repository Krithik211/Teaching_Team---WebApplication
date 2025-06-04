import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Course } from "./course";

@Entity("course_position")
export class CoursePosition {
  @PrimaryGeneratedColumn()
  position_id!: number;

  @Column({ type: "varchar", length: 50 })
  position_name!: string;

  @ManyToMany(() => Course, (course) => course.positions)
  courses!: Course[];
}