import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryColumn({ name: "User_id" })
  id!: number;

  @Column({ name: "Password" })
  password!: string;

  @Column({ name: "User_role_id" })
  roleId!: number;

  // @Column({ name: "Date_of_joining", type: "date" })
  // dateOfJoining!: string;

  // @Column({ name: "DOB", type: "date" })
  // dob!: string;

  @Column({ name: "Mobile_no" })
  mobileNo!: string;

  @Column({ name: "Email_id" })
  email!: string;

  @Column({ name: "First_name" })
  firstName!: string;

  @Column({ name: "Last_name" })
  lastName!: string;

  @Column({name :"IsBlocked",type:"boolean",default: false })
  isBlocked!: boolean;

  @Column({name:"User_name"})
  userName!: string;

}
