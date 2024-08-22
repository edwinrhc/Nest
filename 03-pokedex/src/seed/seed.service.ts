import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {PokeResponse} from "./interfaces/poke-response.interface";


@Injectable()
export class SeedService {

  // Una dependencia del servicio
  private readonly  axios: AxiosInstance = axios;


  async executeSeed(){
    const {data}  = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    data.results.forEach(({name,url}) => {
      // obtenemos el número de pokemon
      const segments = url.split('/');
      const num = +segments[segments.length -2] // la penúltima posición
      console.log({name, num})

    })



    return data.results;

  }

}
