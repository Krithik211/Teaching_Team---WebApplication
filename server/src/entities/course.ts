import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,ManyToOne,OneToMany, JoinTable } from "typeorm";
import { CoursePosition } from "./coursePosition";
import { Semester } from "./semester";
import { LecturerCourse } from "./lectureCourses";
@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  course_id!: number;

  @Column({ type: "varchar", length: 10 })
  course_code!: string;

  @Column({ type: "varchar", length: 100 })
  course_name!: string;

  @ManyToMany(() => CoursePosition, (position) => position.courses)
  @JoinTable({
    name: "course_positions_map",  // Junction table
    joinColumn: {
      name: "course_id",
      referencedColumnName: "course_id"
    },
    inverseJoinColumn: {
      name: "position_id",
      referencedColumnName: "position_id"
    }
  })
  positions!: CoursePosition[];

@ManyToOne(() => Semester, (semester) => semester.courses, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
semester!: Semester;

@OneToMany(() => LecturerCourse, (lc) => lc.course)
lecturerCourses!: LecturerCourse[];
}
