import axios from "axios";
import {PokeapiResponse} from "../interfaces/pokeapi-response.interface.ts";

export class PokeApiAdapter {
    private readonly axios = axios;

   async get(url: string){

        // petición get
       const { data } = await axios.get<PokeapiResponse>(url);
        return data;
    }
    async post( url: string, data: any){

    }

    async patch(url: string, data: any){

    }

    async  delete(url: string){

    }
}