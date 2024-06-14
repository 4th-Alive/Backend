import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Family } from "src/family/entities/family.entity";
import { User } from "src/user/entities/user.entity";

export class diaryDTO{

    @IsOptional()
    @IsString()
    uid : string;

    @IsOptional()
    family_uid : Family;

    @IsOptional()
    user_uid : User;

    @IsString()
    title : string;

    @IsString()
    contents : string;

    @IsOptional()
    @IsString()
    create_date : string;

    @IsNumber()
    sentiment : number;

    @IsNumber()
    private : number; 

}