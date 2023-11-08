import { IsDateString, IsEmail, IsISO8601, IsNotEmpty, IsString, Length } from "class-validator"

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
    @IsDateString()
    @IsISO8601()
    birth_date: string

    @IsString()
    @IsNotEmpty()
    genderId: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    password: string
}

export class ClientUpdateDTO {
    @IsString()
    name: string

    @IsString()
    birthDate: string

    @IsString()
    genderId: string

    @IsString()
    password: string
}