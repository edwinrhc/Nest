import { Module } from '@nestjs/common';
import { SayayinesController } from './sayayines.controller';
import { SayayinesService } from './sayayines.service';

@Module({
  controllers: [SayayinesController],
  providers: [SayayinesService]
})
export class SayayinesModule {}
