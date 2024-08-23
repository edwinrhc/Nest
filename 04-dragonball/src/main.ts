import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted:true,
        transform: true,
        transformOptions:{
          enableImplicitConversion:true
        }
      }));
  app.setGlobalPrefix('api/v1');
  await app.listen(4500);
}

main();
