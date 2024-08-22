import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Pokemon, PokemonSchema} from "./entities/pokemon.entity";
import {Model} from "mongoose";


@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
      MongooseModule.forFeature(
          [{ name: Pokemon.name, schema: PokemonSchema }]) // el Name sale del extendes Document
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
