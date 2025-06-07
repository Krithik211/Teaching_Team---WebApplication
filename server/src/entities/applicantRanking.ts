import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { User } from "./user";
import { TutorApplication } from "./tutorApplication";

@Entity("applicant_rankings")
@Unique(["user", "application"]) // prevent duplicate entries per lecturer + application
export class ApplicantRanking {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.rankings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  user!: User;

  @ManyToOne(() => TutorApplication, app => app.rankings, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  application!: TutorApplication;

  @Column({ name: "rankLevel", type: "varchar", length: 50, nullable: true })
  rank!: string;

  @Column({ type: "text", nullable: true })
  comment!: string;
}