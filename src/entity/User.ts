import {Entity, ObjectIdColumn, ObjectID, Column, OneToMany, JoinColumn} from "typeorm";
import { Change } from "./Change"

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column("double")
    balance: number

    @OneToMany(type => Change, change => change.user)
    balanceChanges: Change[]

}
