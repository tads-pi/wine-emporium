import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateBackofficeClientDTO {
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
    @IsEnum(['ADMINISTRADOR', 'ESTOQUISTA'])
    @ApiProperty({
        description: 'Grupo do usuário',
        example: 'ADMINISTRADOR',
        enum: ['ADMINISTRADOR', 'ESTOQUISTA'],
    })
    group: string;
}