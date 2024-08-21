import {BadRequestException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {CreatePokemonDto} from './dto/create-pokemon.dto';
import {UpdatePokemonDto} from './dto/update-pokemon.dto';
import {isValidObjectId, Model} from "mongoose";
import {Pokemon} from "./entities/pokemon.entity";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class PokemonService {

    constructor(
        @InjectModel(Pokemon.name)  // asi injectamos
        private readonly pokemonModel: Model<Pokemon>
    ) {
    }


    async create(createPokemonDto: CreatePokemonDto) {
        createPokemonDto.name = createPokemonDto.name.toLowerCase();
        try {
            //Insercción
            const pokemon = await this.pokemonModel.create(createPokemonDto);
            return pokemon;
        } catch (error) {
            this.handExceptions(error);
        }


    }

    findAll() {
        return `This action returns all pokemon`;
    }

   async findOne(term: string) {
       let pokemon: Pokemon;
        if( !isNaN(+term)){
            pokemon = await this.pokemonModel.findOne({no: term});
        }
        // Verificamos por MongoID
       if(!pokemon && isValidObjectId(term)){
           pokemon = await this.pokemonModel.findById(term);
       }
       // Name
       if(!pokemon){
           pokemon = await this.pokemonModel.findOne({name:term.toLowerCase().trim()})
       }

       if(!pokemon)
           throw  new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

        return pokemon;
    }

    async update(term: string, updatePokemonDto: UpdatePokemonDto) {
        const pokemon =  await this.findOne(term);

        if(updatePokemonDto.name){
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
        }
        try {
            await pokemon.updateOne(updatePokemonDto);
            return {...pokemon.toJSON(),...updatePokemonDto};
        }catch (error){
            this.handExceptions(error);
        }
    }

    async remove(id: string) {
        // deletedCount la desestructuramos
        const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id  });
        if(deletedCount === 0)
        {
            throw new BadRequestException(`Pokemon with id ${id} not found`);
        }

            return { message: `Pokemon with id ${id} was successfully deleted!!!`};
    }



    // Metodo de mensaje de error
    private handExceptions(error:any){
        if(error.code === 11000){
            throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Pokemon  - Check servers logs`);
    }
}
