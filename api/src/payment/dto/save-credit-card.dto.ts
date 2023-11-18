import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

// No caso de cartão, o mesmo deve pedir o número, código verificador, Nome Completo, data de vencimento e quantidade de parcelas.
export class SaveCreditCardDTO {
    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    @ApiProperty({
        description: 'Número do cartão',
        example: '1234567890123456',
        minLength: 16,
        maxLength: 16,
    })
    number: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    @ApiProperty({
        description: 'Mês de expiração',
        example: '12',
        minLength: 2,
        maxLength: 2,
    })
    expireMonth: string

    @IsString()
    @IsNotEmpty()
    @Length(4, 4)
    @ApiProperty({
        description: 'Ano de expiração',
        example: '2025',
        minLength: 4,
        maxLength: 4,
        minimum: 2023,
        maximum: 2050,
    })
    expireYear: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    @ApiProperty({
        description: 'Código de verificação',
        example: '123',
        minLength: 3,
        maxLength: 3,
    })
    cvv: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(['VISA', 'MASTERCARD'])
    @ApiProperty({
        description: 'Bandeira do cartão',
        example: 'VISA',
        enum: ['VISA', 'MASTERCARD'],
    })
    flag: string

    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    @ApiProperty({
        description: 'Nome completo',
        example: 'Fulano de Tal',
        minLength: 5,
        maxLength: 64,
    })
    full_name: string
}