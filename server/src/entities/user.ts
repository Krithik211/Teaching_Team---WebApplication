import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Avatar } from "./avatar";

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
  
  // @Column({ name: "avatar_url", type: "varchar", length: 255, nullable: true })
  // avatarUrl?: string;
  @ManyToOne(() => Avatar)
  @JoinColumn({ name: "avatar_id" })
  avatar!: Avatar;

}