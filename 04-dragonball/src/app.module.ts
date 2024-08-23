import { Module } from '@nestjs/common';
import {join } from 'path';
import { GuerrerosModule } from './guerreros/guerreros.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {MongooseModule} from "@nestjs/mongoose";
import { SeedController } from './seed/seed.controller';
import { SeedModule } from './seed/seed.module';
import {CommonModule} from "./common/common.module";


@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname,'..', 'public'),
      }),
      MongooseModule.forRoot('mongodb://localhost:27017/nest-dragonball'),
      GuerrerosModule,
      CommonModule,
      SeedModule,
  ],

})
export class AppModule {}
