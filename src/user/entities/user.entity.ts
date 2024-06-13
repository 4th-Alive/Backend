import { Family } from "src/family/entities/family.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email : string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @ManyToOne(() => Family, { eager: true })
    @JoinColumn({ name: 'familyCode'})
    familyCode: Family;

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