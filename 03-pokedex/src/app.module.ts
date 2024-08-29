import {Module} from '@nestjs/common';
import {join} from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import {PokemonModule} from './pokemon/pokemon.module';
import {MongooseModule} from "@nestjs/mongoose";
import {CommonModule} from './common/common.module';
import {SeedModule} from './seed/seed.module';
import * as process from "node:process";
import {ConfigModule} from "@nestjs/config";
import {EnvConfiguration} from "./config/env.config";
import {JoiValidationSchema} from "./config/joi.validation";


@Module({
    imports: [
        ConfigModule.forRoot({
            load:[ EnvConfiguration],
            validationSchema: JoiValidationSchema

        }), // Siempre al inicio
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),

        MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
        PokemonModule,
        CommonModule,
        SeedModule,
    ],

})
export class AppModule {

}
