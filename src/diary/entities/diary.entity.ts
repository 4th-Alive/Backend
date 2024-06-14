
import { Family } from "src/family/entities/family.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Diary {
    @PrimaryGeneratedColumn({type:'bigint'})
    pk : number;

    @Column({unique:true, length:'16', default:null,})
    uid : string;

    @ManyToOne(() => Family, { eager: true })
    @JoinColumn({ name: 'family_uid', referencedColumnName: 'uid'})
    family_uid: Family;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_uid', referencedColumnName: 'uid'})
    user_uid: User;

    @Column({default:null})
    title: string;

    @Column({length : '1000', default:null})
    contents: string;

    @Column({ type: 'timestamp', default:null})
    create_date: Date;

    @Column({default:null})
    sentiment: number;

    @Column({type:"tinyint", default:false})
    private: number;

}

