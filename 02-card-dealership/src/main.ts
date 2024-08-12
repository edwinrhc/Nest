import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usamos los Pipes globalmente
  app.useGlobalPipes(
      new ValidationPipe({
            whitelist:true, // Solo deja la data que se espera
            forbidNonWhitelisted:true // aqui te muestra la data que no existe en el DTO
      })

  );


  await app.listen(3000);
}
bootstrap();
