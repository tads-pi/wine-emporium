import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SaveAddressDTO {
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    neighborhood: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    zip: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    complement: string;
}