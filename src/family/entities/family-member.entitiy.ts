import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Family } from "./family.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class FamilyMember {

    @PrimaryGeneratedColumn({type:'bigint'})
    id : number;

    @ManyToOne(() => Family, { eager: true })
    @JoinColumn({ name: 'family_uid', referencedColumnName: 'uid'})
    family_uid: Family;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid'})
    user_uid: User;

    @Column({default:null})
    role : number;
}
