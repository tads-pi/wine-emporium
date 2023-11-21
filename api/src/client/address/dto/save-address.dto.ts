import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

type AddressType = "BILLING" | "SHIPPING"

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
    @IsOptional()
    complement: string;

    @IsString()
    @IsOptional()
    @IsEnum(["BILLING", "SHIPPING"])
    type: AddressType
}