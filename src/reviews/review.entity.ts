import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReviewRatingEnum } from "./enums/review-rating-enum";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;

    @Column({
        type: 'enum',
        enum: ReviewRatingEnum,
    })
    rating: ReviewRatingEnum;

    @Column({ type: 'text' })
    comment: string;

    @CreateDateColumn()
    createdDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
