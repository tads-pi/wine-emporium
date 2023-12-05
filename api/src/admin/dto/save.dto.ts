import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, isNotEmpty } from "class-validator";

export class SaveBackofficeClientDTO {
    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Fulano de Tal',
        minLength: 5,
        maxLength: 64,
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    @ApiProperty({
        description: 'CPF do usuário',
        example: '01234567890',
        minLength: 11,
        maxLength: 11,
    })
    document: string;

    @IsString()
    @IsNotEmpty()
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
    @Length(1, 64)
    @ApiProperty({
        description: 'Grupo do usuário',
        example: 'ADMINISTRADOR',
        minLength: 1,
        maxLength: 64,
    })
    group: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'password',
        minLength: 8,
        maxLength: 64,
    })
    password: string
}

