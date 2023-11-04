import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class BackofficeClientSignUpDTO {
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
    groupId: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}