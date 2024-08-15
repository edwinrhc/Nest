import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import {Brand} from "./entities/brand.entity";
import {Car} from "../cars/interfaces/car.interface";

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
      ]

  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }

  fillBrandsWithSeedData(brands:Brand[]){
    this.brands = brands;
  }
}
