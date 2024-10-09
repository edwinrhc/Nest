import {BeforeInsert, BeforeUpdate, Unique, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import {ProductImage} from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";

@Entity({name: 'products'})
@Unique('UQ_product_title', ['title'])  // Constraint de título único
@Unique('UQ_product_slug', ['slug'])    // Constraint de slug único
export class Product {

    @ApiProperty({
        example: '1de8ff1a-3a2a-47d7-bc77-3856a1e8c124',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;


    @ApiProperty({
        example: 0,
        description: 'Product Price'
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Anim reprehendreid nulla in anim mollit minim irure',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't-shirt_teslo',
        description: 'Product Slug - for SEO',
        uniqueItems: true
    })
    @Column({
        type: 'text',
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column({
        type: 'int',
        default: 0

    })
    stock: number;


    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product sizes'
    })
    @Column('text', {
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender'
    })
    @Column('text')
    gender: string;


    @ApiProperty()
    @Column('text',{
        array:true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];


    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user: User;



    @BeforeInsert()
    checkSlugInsert(){
        if(!this.slug){
            this.slug = this.title;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

     @BeforeUpdate()
    checkSlugUpdate(){
         this.slug = this.slug
             .toLowerCase()
             .replaceAll(' ','_')
             .replaceAll("'",'')
     }
}
