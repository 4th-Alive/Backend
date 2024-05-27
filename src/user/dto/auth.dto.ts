import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class signUpDTO {

    @IsEmail()
    email : string;

    @IsString()
    username: string;

    @IsString()
    @Length(4,20)
    password: string;
}

export class signInDTO{
    @IsEmail()
    email : string;

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
