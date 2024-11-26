import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { OrderStatusEnum } from "./enums/order-status-enums";
import { Exclude } from "class-transformer";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders, { eager: true })
    user: User;

    @ManyToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: ['soft-remove', 'remove']}) // Enable cascading
    orderItems: OrderItem[];

    @Column({
        type: 'text',
        nullable: false,
    })
    shippingAddress: string;

    @Column({
        type: 'enum',
        enum: OrderStatusEnum,
        default: OrderStatusEnum.Pending
    })
    status: OrderStatusEnum;

    @Column('decimal', {
        precision: 10,
        scale: 2,
    })
    totalAmount: number;

    @Exclude()
    @CreateDateColumn()
    orderDate: Date;

    @Exclude()
    @UpdateDateColumn()
    updateAt: Date;
    
    @Exclude()
    @DeleteDateColumn()
    deletedAt: Date;
}
