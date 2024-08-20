import {IsInt, IsPositive, Length, Min} from 'class-validator';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @Length(1) // Verificamos que la longitud mínima sea 1
    name: string;

}
