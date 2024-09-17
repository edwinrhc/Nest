import {BeforeInsert, BeforeUpdate, Unique, Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {ProductImage} from "./product-image.entity";

@Entity({name: 'products'})
@Unique('UQ_product_title', ['title'])  // Constraint de título único
@Unique('UQ_product_slug', ['slug'])    // Constraint de slug único
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true
    })
    title: string;

    @Column('float', {
        default: 0
    })
    price: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'text',
        unique: true
    })
    slug: string;

    @Column({
        type: 'int',
        default: 0

    })
    stock: number;


    @Column('text', {
        array: true
    })
    sizes: string[];

    @Column('text')
    gender: string;


    @Column('text',{
        array:true,
        default: []
    })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];



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
