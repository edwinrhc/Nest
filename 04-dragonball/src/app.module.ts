import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SayayinesModule } from './sayayines/sayayines.module';


@Module({

  controllers: [AppController],
  providers: [AppService],
  imports: [SayayinesModule],
})
export class AppModule {}
