import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class signUpDTO {

    @IsOptional()
    @IsString()
    uid : string;

    @IsString()
    id : string;
    
    @IsString()
    @Length(4,20)
    password: string;

    @IsString()
    nickname: string;

    @IsString()
    realname : string;

    @IsOptional()
    @IsString()
    signup_date : string;
    
    @IsOptional()
    @IsString()
    profile_uid : string;

    @IsOptional()
    @IsString()
    exp : number;

}

export class signInDTO{
    @IsString()
    id : string;

    @IsString()
    @Length(4,20)
    password: string;
}

export class guestSignupDTO{
    @IsOptional()
    @IsString()
    uid : string;

    @IsString()
    @Length(4,20)
    password: string;
}

export class guestSigninDTO{
    @IsString()
    uid : string;

    @IsString()
    @Length(4,20)
    password: string;
}
