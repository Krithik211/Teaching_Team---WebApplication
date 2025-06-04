import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user"; // Make sure this path is correct

@Entity("tutorApplications")
export class TutorApplication {
  @PrimaryGeneratedColumn()
  applicationID!: number;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: "SET NULL" })
  @JoinColumn({ name: "userID" })
  user!: User;

  @Column({ nullable: true })
  courseCode!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  mobile!: string;

  @Column({ nullable: true })
  course!: string;

  @Column()
  position!: string;

  @Column({ type: "text", nullable: true })
  availability!: string;

  @Column({ type: "text", nullable: true })
  previousRole!: string;

  @Column({ type: "text", nullable: true })
  skills!: string;

  @Column({ nullable: true })
  qualification!: string;

  @Column({ nullable: true })
  specialization!: string;

  @CreateDateColumn({ type: "datetime" })
  submitted_at!: Date;
}
