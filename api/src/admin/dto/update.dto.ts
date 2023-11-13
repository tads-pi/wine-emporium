import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateBackofficeClientDTO {
    @IsString()
    @IsNotEmpty()
    @Length(5, 64)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    document: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['ADMINISTRADOR', 'ESTOQUISTA'])
    group: string;
}