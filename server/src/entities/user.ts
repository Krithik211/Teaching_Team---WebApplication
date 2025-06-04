import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Avatar } from "./avatar";
import { TutorApplication } from "./tutorApplication";

@Entity({ name: "users" }) // Use the actual table name
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId!: number;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName!: string;

  @Column({ name: "email", type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password!: string;

  @Column({ name: "role", type: "varchar", length: 255 })
  role!: string;

  @Column({ name: "date_joined", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateJoined!: Date;

  @ManyToOne(() => Avatar)
  @JoinColumn({ name: "avatar_id" })
  avatar!: Avatar;

  @OneToMany(() => TutorApplication, (application) => application.user)
  applications!: TutorApplication[];

}