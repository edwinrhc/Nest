import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import {CarsModule} from "../cars/cars.module";

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService]

})
export class BrandsModule {}
