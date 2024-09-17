import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product,ProductImage} from "./entities";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
      TypeOrmModule.forFeature([
          Product,
          ProductImage
      ])
  ],
    exports:[
        ProductsService,
        TypeOrmModule // Here we export the repositories
    ]
})
export class ProductsModule {
}
