
// import { Family } from "src/family/entities/family.entity";
// import { User } from "src/user/entities/user.entity";
// import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

// @Entity()
// export class Diary {
//     @PrimaryGeneratedColumn()
//     id : number;

//     @ManyToOne(() => User, user => user.email)
//     @JoinColumn({ name: 'email', referencedColumnName: 'email'})
//     email: User;

//     @Column()
//     title: string;

//     @Column()
//     contents: string;

//     @Column()
//     sentiment: string;

//     @Column({default:false})
//     isPublic: boolean;

//     @Column({ type: 'datetime' })
//     uploadDate: Date;
    
//     @ManyToOne(() => Family, { eager: true })
//     @JoinColumn({ name: 'familyCode'})
//     familyCode: Family;

// }

