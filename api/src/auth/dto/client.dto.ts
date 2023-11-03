import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class ClientSignInDTO {
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

export class ClientSignUpDTO {
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
    birth_date: string

    @IsString()
    @IsNotEmpty()
    genderId: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    password: string
}