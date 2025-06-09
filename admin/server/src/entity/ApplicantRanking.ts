import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Unique,
    BaseEntity,
} from "typeorm";
import { User } from "./User";
import { TutorApplication } from "./tutorApplications";

@Entity("applicant_rankings")
@Unique(["application"])
export class ApplicantRanking extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "userId"})
    userId!: number;

    @ManyToOne(() => TutorApplication, (app) => app.rankings, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn({ name: "applicationID" })
    application!: TutorApplication;

    @Column({ name: "rankLevel", type: "varchar", length: 50, nullable: true })
    rankLevel!: string;

    @Column({ name: "comment", type: "text", nullable: true })
    comment!: string;
}
