import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable} from 'typeorm'
import { CoursePosition } from './CoursePosition';

@Entity({name: "courses"})
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn({name: "course_id"})
    id!:number;

    @Column({name: "Course_name"})
    courseName!: string;

    @Column({name: "Course_code"})
    courseCode!: string;

    @Column({name: "semesterId"})
    semester!: number;

    @ManyToMany(() => CoursePosition, { eager: true })
    @JoinTable({
    name: "course_positions_map",
    joinColumn: { name: "course_id"},
    inverseJoinColumn: { name: "position_id" },
  })
  positions!: CoursePosition[];
}