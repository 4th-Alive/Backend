import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Family {

    @PrimaryGeneratedColumn({type:'bigint'})
    id : number;

    @Column({unique:true, length : '16', default:null})
    uid : string

    @Column({default:null})
    name : string

    @Column({ type: 'timestamp', default:null})
    create_date : Date;
}
