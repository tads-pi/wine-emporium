import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class ClientSignUpDTO {
    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Fulano de Tal',
        minLength: 5,
        maxLength: 64,
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    @ApiProperty({
        description: 'CPF do usuário',
        example: '01234567890',
        minLength: 11,
        maxLength: 11,
    })
    document: string

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
    email: string

    @IsString()
    @IsNotEmpty()
    @Length(1, 64)
    @IsDateString()
    @IsISO8601()
    @ApiProperty({
        description: 'Data de nascimento do usuário',
        example: '1990-01-01',
        minLength: 1,
        maxLength: 64,
    })
    birth_date: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do Gênero',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    genderId: string

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

export class ClientUpdateDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'Fulano de Tal',
        minLength: 5,
        maxLength: 64,
    })
    name: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'CPF do usuário',
        example: '01234567890',
        minLength: 11,
        maxLength: 11,
    })
    birthDate: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'ID do Gênero',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    genderId: string
}

export class ClientCheckDataDTO {
    @IsOptional()
    @IsString()
    email: string | null

    @IsOptional()
    @IsString()
    document: string | null
}