import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import {GuerrerosModule} from "../guerreros/guerreros.module";
import {CommonModule} from "../common/common.module";
import {SeedController} from "./seed.controller";

@Module({
  controllers:[SeedController],
  providers: [SeedService],
  imports: [
      GuerrerosModule,
      CommonModule
  ]
})
export class SeedModule {}
