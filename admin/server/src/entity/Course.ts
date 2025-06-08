import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

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
}