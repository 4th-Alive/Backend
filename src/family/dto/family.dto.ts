import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class familyDTO{
    @IsOptional()
    @IsString()
    uid : string

    @IsString()
    name : string

    @IsOptional()
    @IsDate()
    create_date : string;

    @IsOptional()
    @IsNumber()
    role : number;
}
