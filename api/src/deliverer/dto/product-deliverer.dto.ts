import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class ProductDelivererDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do produto',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    productId: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    @ApiProperty({
        description: 'CEP do usuário',
        example: '01001000',
        minLength: 8,
        maxLength: 8,
    })
    zip: string
}