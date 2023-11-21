import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

type SaveProductCategories = "VINHOS" | "UTILITARIOS" | "OUTROS"

export class SaveProductDTO {
    @IsString()
    @IsNotEmpty()
    @Length(1, 200)
    @ApiProperty({
        description: 'Nome do produto',
        example: 'Produto 1',
        minLength: 1,
        maxLength: 200,
    })
    name: string

    @IsString()
    @Length(1, 2000)
    @ApiProperty({
        description: 'Descrição do produto',
        example: 'Descrição do produto 1',
        minLength: 1,
        maxLength: 2000,
    })
    description: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Preço do produto',
        example: 10.99,
    })
    price: number

    @IsNumber()
    @IsNotEmpty()
    @IsEnum([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
    @ApiProperty({
        description: 'Avaliação do produto',
        example: 5,
        enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    })
    ratings: number

    @IsString()
    @IsNotEmpty()
    @IsEnum(["VINHOS", "UTILITARIOS", "OUTROS"])
    @ApiProperty({
        description: 'Categoria do produto',
        example: 'VINHOS',
        enum: ["VINHOS", "UTILITARIOS", "OUTROS"],
    })
    category: SaveProductCategories

    @IsNumber()
    @IsNotEmpty()
    stock: number
}

export class UpdateProductStockDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ID do produto',
        example: '55881d20-fc60-4fb3-8ecf-ee7cb3ddcc51',
    })
    stock_id: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Quantidade do produto',
        example: 10,
    })
    total: number
}