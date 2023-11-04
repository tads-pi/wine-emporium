import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class BackofficeClientSignInDTO {
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