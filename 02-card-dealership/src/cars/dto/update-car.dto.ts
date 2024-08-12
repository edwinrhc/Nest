import {IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";

export class UpdateCarDto{

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString( {message:`The brand most be a cool string`})
    @IsNotEmpty()
    @IsOptional()
    readonly brand?: string;

    @IsString({message:`The model most be a cool string`})
    @IsNotEmpty()
    @IsOptional()
    readonly model?: string;
}
