import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ParseUUIDPipe, ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usamos los Pipes globalmente
  app.useGlobalPipes(
      new ValidationPipe({
            whitelist:true, // Solo deja la data que se espera
            forbidNonWhitelisted:true // Muestra la data que no existe en el DTO
      }),
      new ParseUUIDPipe( { // Aplica ParseUUIDPipe globalmente
          version:'4',
          exceptionFactory: (errors) => {
              return new BadRequestException('El ID proporcionado no es un UUID v4 válido')
          }
      })

  );


  await app.listen(3000);
}
bootstrap();
