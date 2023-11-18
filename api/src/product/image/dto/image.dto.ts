import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class UploadProductImageDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Base64 da imagem',
    })
    imageBinary: string
}