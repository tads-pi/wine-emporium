import { IsNotEmpty, IsString, Length, isNotEmpty } from "class-validator";

export class SaveBackofficeClientDTO {
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
    @Length(5, 64)
    email: string;

    @IsString()
    @IsNotEmpty()    
    groupId: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 64)
    password: string
}

