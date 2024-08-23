import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from "axios";
import {Model} from "mongoose";
import {Guerreros} from "../guerreros/entities/guerreros.entity";
import {InjectModel} from "@nestjs/mongoose";
import {AxiosAdapter} from "../common/adapters/axios.adapter";
import {PokeResponse} from "./interfaces/poke-response.interface";


@Injectable()
export class SeedService {

    // Una dependencia del servicio
    private readonly axios : AxiosInstance = axios;

    constructor(
        @InjectModel(Guerreros.name)
        private readonly guerrerosModel: Model<Guerreros>,
        private readonly http: AxiosAdapter
    ) {
    }

    async executedSeed(){

        try{
            await this.guerrerosModel.deleteMany({}); // Delete * from guerreros;
            const data = await this.http.get<PokeResponse>('https://dragonball-api.com/api/characters');
         //   console.log(data)

            const guerrerosToInsert: { name:string, race: string}[] = [];
            data.items.forEach(({name, race}) => {

                guerrerosToInsert.push({name, race});

            })
             // console.log(sayayinToInsert);
            await this.guerrerosModel.insertMany(guerrerosToInsert);
            return 'Seed executed';

        }catch(error){
            console.log('Error executing seed: ', error);
            throw new Error('Error executind seed service');
        }



    }



}
