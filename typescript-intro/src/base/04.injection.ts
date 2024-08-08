
import { Move, PokeapiResponse } from '../interfaces/pokeapi-response.interface';
import {PokeApiAdapter} from "../api/pokeApi.adapter.ts";

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }

    constructor(
        public readonly id: number,
        public name: string,
        private readonly http: PokeApiAdapter
        // Todo: inyectar dependencias

    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<Move[]> {
        // const { data } = await axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon/4');
        const  data  = await this.http.get('https://pokeapi.co/api/v2/pokemon/4');
        console.log( data.moves );

        return data.moves;
    }

}

const pokeApi = new PokeApiAdapter()
export const charmander = new Pokemon( 4, 'Charmander',pokeApi );

charmander.getMoves();