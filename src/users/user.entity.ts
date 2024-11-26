import { Exclude } from "class-transformer";
import { Order } from "src/orders/order.entity";
import { Review } from "src/reviews/review.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true,
    })
    lastName?: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false
    })
    @Exclude()
    password: string;
    
    @Column({
        type: 'varchar',
        length: 1025,
        nullable: false
    })
    address: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Review, (reviews) => reviews.user)
    reviews: Review[];
    
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
