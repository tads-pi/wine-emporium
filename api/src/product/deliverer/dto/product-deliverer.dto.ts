import { IsNotEmpty, IsString, Length } from "class-validator"

export class ProductDelivererDTO {
    @IsString()
    @IsNotEmpty()
    productId: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 8)
    zip: string
}