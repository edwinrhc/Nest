import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import {Product} from "./product.entity";


@Entity()
export class ProductImage{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    url:string;

    @ManyToOne(
        () => Product,
        ( product ) => product.images,
    )
    @JoinColumn({
        name:'product_id'
    })
    product : Product
}
