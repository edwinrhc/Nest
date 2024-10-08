import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {PaginationDto} from 'src/common/dtos/pagination.dto';
import {validate as isUUID} from 'uuid';
import {ProductImage} from "./entities";
import {User} from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {

    private readonly logger = new Logger('ProductsService');

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductImage)
        private readonly productImageRepository: Repository<ProductImage>,
        private readonly dataSoruce: DataSource
    ) {
    }


    async create(createProductDto: CreateProductDto, user: User) {

        try {
            const {images = [], ...productDetails} = createProductDto;
            const product = this.productRepository.create({
                ...productDetails,
                images: images.map((image) => this.productImageRepository.create(
                    {
                        url: image
                    })),
                user: user
            });
            await this.productRepository.save(product);
            return {...product, images: images};

        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    //TODO: Paginar
    async findAll(paginationDto: PaginationDto) {
        const {limit = 10, offset = 0} = paginationDto;

        const product = await this.productRepository.find({
            take: limit,
            skip: offset,
            relations: {
                images: true
            }
        });
        return product.map(product => ({
            ...product,
            images: product.images.map(img => img.url)
        }))
    }

    async findOne(term: string) {

        let product: Product;
        if (isUUID(term)) {
            product = await this.productRepository.findOneBy({id: term});
        } else {
            const queryBuilder = this.productRepository.createQueryBuilder('prod');
            product = await queryBuilder
                .where(`UPPER(title) =:title or slug =:slug`, {
                    title: term.toUpperCase(),
                    slug: term.toLowerCase()
                })
                .leftJoinAndSelect('prod.images', 'prodImages')
                .getOne();
        }

        if (!product) {
            throw new NotFoundException(`Product with id ${term} not found`);
        }

        return product;
    }

    // Es un metodo intermedio!!!!
    async findOnePlain(term: string) {
        const {images = [], ...rest} = await this.findOne(term);
        return {
            ...rest,
            images: images.map(image => image.url)
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto, user:User) {

        const {images, ...toUpdate} = updateProductDto;

        const product = await this.productRepository.preload({
            id: id,
            ...toUpdate
        });
        if (!product) throw new NotFoundException(`Product with id ${id} not found`);

        // Creaate query runner
        // Docu: https://orkhan.gitbook.io/typeorm/docs/insert-query-builder
        const queryRunner = this.dataSoruce.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            if (images) {
                await queryRunner.manager.delete(ProductImage, {product: {id}})

                product.images = images.map(
                    image => this.productImageRepository.create({url: image}))

            }
            //Aqui guardamos el producto
            product.user = user;
            await queryRunner.manager.save(product);
            //  await this.productRepository.save(product);
            await queryRunner.commitTransaction();
            await queryRunner.release();
            return this.findOnePlain(id);
        } catch (error) {

            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleDBExceptions(error);
        }
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

    async deleteAllProducts() {
        const query = this.productRepository.createQueryBuilder('product');
        try {
            return await query
                .delete()
                .where({})
                .execute();
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }
}
