import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

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
    @Length(2, 2)
    expireYear: string
    
    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    cvv: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(['VISA', 'MASTERCARD'])
    flag: string

    // TODO: 
    // name: string
    // cpf: string
    // birthDate: string
    // phone: string
}