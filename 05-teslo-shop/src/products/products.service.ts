import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID} from 'uuid';

@Injectable()
export class ProductsService {

    private readonly logger = new Logger('ProductsService');

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {
    }


    async create(createProductDto: CreateProductDto) {

        try {
            const product = this.productRepository.create(createProductDto);
            await this.productRepository.save(product);
            return product;

        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    //TODO: Paginar
    async findAll(paginationDto:PaginationDto) {
        const { limit = 10, offset = 0}  = paginationDto;

        return await this.productRepository.find({
            take: limit,
            skip: offset,
            //TODO: RELACIONES
        });
    }

    async findOne(term: string) {

        let product: Product;
        if(isUUID(term)){
            product = await this.productRepository.findOneBy({id: term});
        }else{
          const queryBuilder = this.productRepository.createQueryBuilder();
          product = await queryBuilder
                .where(`UPPER(title) =:title or slug =:slug`,{
                    title: term.toUpperCase(),
                    slug: term.toLowerCase()
                }).getOne();
        }

        if (!product) {
            throw new NotFoundException(`Product with id ${ term } not found`);
        }

        return product;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`;
    }

    async remove(id: string) {

        const result = await this.findOne(id);
        await this.productRepository.remove(result);
        return `Product with id ${id} has been successfully removed.`;
    }

    private handleDBExceptions(error: any) {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected error, check server logs!');
    }
}
