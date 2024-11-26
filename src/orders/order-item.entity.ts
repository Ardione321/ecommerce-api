import { Product } from "src/products/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./order.entity";
import { Exclude } from "class-transformer";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @Column({ 
        type: 'text', 
        nullable: true, 
        default: null 
    })
    description: string;

    @ManyToOne(() => Product, (product) => product.orderItems,) // Ensure `orderItems` is defined in `Product`
    product: Product; // Change this from Product[] to Product

    @Column({ 
        type: 'int', 
        nullable: false 
    })
    quantity: number;

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;
    
    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;
}
