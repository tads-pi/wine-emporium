import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

// No caso de cartão, o mesmo deve pedir o número, código verificador, Nome Completo, data de vencimento e quantidade de parcelas.
export class SaveCreditCardDTO {
    @IsString()
    @IsNotEmpty()
    @Length(16, 16)
    number: string

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    expireMonth: string

    @IsString()
    @IsNotEmpty()
    @Length(4, 4)
    expireYear: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    cvv: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(['VISA', 'MASTERCARD'])
    flag: string

    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    full_name: string
}