import {IsNotEmpty, IsString} from "class-validator";

export class CreateCarDto{

    @IsString( {message:`The brand most be a cool string`})
    @IsNotEmpty()
    readonly brand: string;

    @IsString({message:`The model most be a cool string`})
    @IsNotEmpty()
    readonly model: string;
}
