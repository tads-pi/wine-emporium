import { IsNotEmpty, IsString, Length } from "class-validator";

export class UploadProductImageDto {
    @IsString()
    @IsNotEmpty()
    imageBinary: string
}