import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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