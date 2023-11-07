import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class SaveProductDTO {
    @IsString()
    @IsNotEmpty()
    @Length(6, 200)
    name: string

    @IsString()
    @Length(0, 2000)
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    @IsEnum([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
    ratings: number
}

export class UpdateProductStockDTO {
    @IsString()
    @IsNotEmpty()
    stock_id: string

    @IsNumber()
    @IsNotEmpty()
    total: number
}