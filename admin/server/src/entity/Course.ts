import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

@Entity({name: "Courses"})
export class Course extends BaseEntity {
    @PrimaryGeneratedColumn({name: "Course_id"})
    id!:number;

    @Column({name: "Course_name"})
    courseName!: string;

    @Column({name: "Course_code"})
    courseCode!: string;
}