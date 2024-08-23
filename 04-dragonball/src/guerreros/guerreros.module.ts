import { Module } from '@nestjs/common';
import { GuerrerosController } from './guerreros.controller';
import { GuerrerosService } from './guerreros.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Guerreros, GuerrerosSchema} from "./entities/guerreros.entity";

@Module({
  controllers: [GuerrerosController],
  providers: [GuerrerosService],
  imports: [
      MongooseModule.forFeature(
          [{ name: Guerreros.name, schema: GuerrerosSchema }]
      )
  ],
  exports: [MongooseModule]
})
export class GuerrerosModule {}
