import { Injectable } from '@nestjs/common';
import {CarsService} from "../cars/cars.service";
import {BrandsService} from "../brands/brands.service";
import {CARS_SEED} from "./data/cars.seed";
import {BRANDS_SEED} from "./data/brands.seed";


@Injectable()
export class SeedService {

  constructor(
      private readonly carsService:CarsService,
      private readonly bransService:BrandsService

  ) {
  }

  populateDB(){

    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.bransService.fillBrandsWithSeedData(BRANDS_SEED);

    //Cargamos cierto tipo de datos - semilla
    return 'SEED execute';
  }


}
