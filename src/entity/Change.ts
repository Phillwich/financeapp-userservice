import {Entity, ObjectIdColumn, ObjectID, Column, OneToOne} from "typeorm";
import { User } from "./User"

@Entity()
export class Change {

  @ObjectIdColumn()
  id: ObjectID;

  @Column("double")
  amount: number

  @Column()
  note: string

  @Column()
  category: string

  @OneToOne(type => User, User => User.balanceChanges)
    user: User;

}