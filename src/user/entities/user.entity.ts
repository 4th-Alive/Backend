import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    pk: number;

    @Column({unique: true, type : 'char', length : '16', default : null})
    uid : string;

    @Column({default : null})
    id : string;
    
    @Column({default : null})
    password: string;

    @Column({default : null})
    nickname: string;

    @Column({default : null})
    realname : string;

    @Column({ type: 'timestamp', default:null})
    signup_date : Date;

    @Column({type : 'char', length : '16', default:null})
    profile_uid : string;

    @Column({type: 'bigint', default:null})
    exp : number;

    @Column({ nullable: true })
    currentHashedRefreshToken?: string;
    
}

@Entity()
export class Guest{
    @PrimaryColumn()
    uid : string;

    @Column()
    password : string;
}