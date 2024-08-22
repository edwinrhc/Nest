import {Injectable} from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {PokeResponse} from "./interfaces/poke-response.interface";
import {InjectModel} from "@nestjs/mongoose";
import {Pokemon} from "../pokemon/entities/pokemon.entity";
import {Model} from "mongoose";
import {AxiosAdapter} from "../common/adapters/axios.adapter";


@Injectable()
export class SeedService {

    // Una dependencia del servicio
    private readonly axios: AxiosInstance = axios;

    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter
    ) {
    }


    async executeSeed() {
        try {
            await this.pokemonModel.deleteMany({}); // delete * from pokemons;
            const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
            const pokemonToInsert: { name: string, no: number }[] = [];
            data.results.forEach(({name, url}) => {
                // obtenemos el número de pokemon
                const segments = url.split('/');
                const no = +segments[segments.length - 2];// la penúltima posición
                //Insertar masivamente
                pokemonToInsert.push({name, no});
            });
            await this.pokemonModel.insertMany(pokemonToInsert);
            return 'Seed executed';

        } catch (error){
            console.error('Error executing seed: ', error);
            throw new Error('Error executing seed service');
        }
    }

}
