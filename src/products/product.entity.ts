import { Exclude } from 'class-transformer';
import { Categories } from 'src/categories/categories.entity';
import { OrderItem } from 'src/orders/order-item.entity';
import { Review } from 'src/reviews/review.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar', 
        length: 255, 
        nullable: false 
    })
    name: string;

    @Column({
        type: 'float', 
        nullable: false 
    })
    price: number;

    @Column({ 
        type: 'text', 
        nullable: false 
    })
    description: string;

    @ManyToOne(() => Categories, (category) => category.products, { eager: true })
    category: Categories; // This keeps the relationship
    
    @Column({ 
        type: 'int', 
        nullable: false 
    })
    stock: number;

    @Column({ 
        type: 'simple-array', 
        nullable: false 
    })
    images: string[];

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];

    @ManyToMany(() => OrderItem, (orderItem) => orderItem.product) // Link to OrderItem
    orderItems: OrderItem[];

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    @Exclude()
    deletedAt: Date;
}
