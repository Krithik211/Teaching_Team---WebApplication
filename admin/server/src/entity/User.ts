import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn({ name: "user_id" })
  id!: number;

  @Column({ name: "role" })
  role!: string;

  @Column({ name: "email" })
  email!: string;

  @Column({ name: "first_name" })
  firstName!: string;

  @Column({ name: "last_name" })
  lastName!: string;

  @Column({name :"isBlocked",type:"boolean",default: false })
  isBlocked!: boolean;
}
