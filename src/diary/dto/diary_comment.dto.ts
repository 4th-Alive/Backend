import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Diary } from "../entities/diary.entity";

export class diaryCommentDTO{

    @IsOptional()
    @IsString()
    uid : string;

    @IsOptional()
    diary_uid : Diary;

    @IsOptional()
    user_uid : User;

    @IsString()
    contents : string;

    @IsOptional()
    @IsString()
    create_date : string;

}