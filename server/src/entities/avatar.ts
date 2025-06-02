// src/entities/Avatar.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "avatars" })
export class Avatar {
  @PrimaryGeneratedColumn({ name: "avatar_id" })
  avatarId!: number;

  @Column({ name: "avatar_url" })
  avatarUrl!: string;
}