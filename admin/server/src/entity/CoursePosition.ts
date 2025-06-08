import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { Course } from "./Course";

@Entity({ name: "course_position" })
export class CoursePosition extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "position_id" })
  id!: number;

  @Column({ name: "position_name" })
  name!: string;

  @ManyToMany(() => Course, (course) => course.positions)
  courses!: Course[];
}