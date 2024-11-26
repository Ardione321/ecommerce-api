import { 
    BadRequestException, 
    Injectable, 
    NotFoundException, 
    RequestTimeoutException
 } from '@nestjs/common';
import { Review } from '../review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewsDto } from '../dtos/create-reviews.dto';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateReviewsProvider {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>
    ) {}

    public async createReviews(createReviewDto: CreateReviewsDto) : Promise<Review> {
        if(!createReviewDto) throw new BadRequestException('Review Data is Required');
        const { userId, productId, rating, comment} = createReviewDto;
        const [user, product] = await Promise.all([
            this.userRepository.findOneBy({ id: userId }),
            this.productRepository.findOneBy({ id: productId }),
        ]);
        if(!user) throw new NotFoundException(`User with ID ${userId} not found.`);
        if(!product) throw new NotFoundException(`Product with ID ${productId} not found.`);
        const review = this.reviewRepository.create({
            user,
            product,
            rating,
            comment,
        });
        return await this.reviewRepository.save(review);
    }

}
