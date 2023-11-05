import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CartProductDTO {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

export class UpdateCartDTO {
    @IsNotEmpty()
    products: CartProductDTO[];
}