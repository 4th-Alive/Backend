
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Diary } from "./diary.entity";

@Entity()
export class DiaryComment {
    @PrimaryGeneratedColumn({type:'bigint'})
    pk : number;

    @Column({unique:true, length:'16', default:null,})
    uid : string;

    @ManyToOne(() => Diary, { eager: true })
    @JoinColumn({ name: 'diary_uid', referencedColumnName: 'uid'})
    diary_uid: Diary;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid'})
    user_uid: User;

    @Column({length : '1000', default:null})
    contents: string;

    @Column({ type: 'timestamp', default:null})
    create_date: Date;
}

