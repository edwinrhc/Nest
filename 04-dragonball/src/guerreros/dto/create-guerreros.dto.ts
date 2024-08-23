import {IsNotEmpty, IsString} from "class-validator";


export class CreateGuerrerosDto {


    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    race:string;

}