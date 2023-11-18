import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class BackofficeClientSignInDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Length(5, 64)
    @ApiProperty({
        description: 'Email do usuário',
        example: 'email@example.com',
        minLength: 5,
        maxLength: 64,
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'password',
        minLength: 8,
        maxLength: 64,
    })
    password: string;
}