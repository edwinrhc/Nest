import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion:true
      }
    }));

  app.setGlobalPrefix('api/v2');


  await app.listen(process.env.PORT );
    console.log(`App running on port ${process.env.PORT}`)
}

bootstrap();
