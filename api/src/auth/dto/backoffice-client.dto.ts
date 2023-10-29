import { IsEmail, IsNotEmpty, IsString, Length, isString } from "class-validator";

export class BackofficeClientSigninDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 64)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string;
}

export class BackofficeClientSignupDTO {
    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    document: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 64)
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    group: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}