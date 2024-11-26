import { Injectable, NotFoundException, BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review.entity';
import { UpdateReviewsDto } from '../dtos/update-reviews.dto';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class UpdateReviewsProvider {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    public async updateReview(updateDto: UpdateReviewsDto): Promise<Review> {
        if (!updateDto) throw new BadRequestException('Review data is required for update.');
        const { userId, productId, rating, comment } = updateDto;
        const reviewToUpdate = await this.reviewRepository.findOneBy({ id: updateDto.id });
        if (!reviewToUpdate) throw new NotFoundException(`Review with ID ${updateDto.id} not found.`);
        if (userId) {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user) throw new NotFoundException(`User with ID ${userId} not found.`);
        }
        if (productId) {
            const product = await this.productRepository.findOneBy({ id: productId });
            if (!product) throw new NotFoundException(`Product with ID ${productId} not found.`);
        }
        const updatedReview = await this.reviewRepository.preload({
            id: updateDto.id,
            user: userId ? { id: userId } : undefined,
            product: productId ? { id: productId } : undefined,
            rating: rating !== undefined ? rating : undefined,
            comment: comment !== undefined ? comment : undefined,
        });
        if (!updatedReview) throw new NotFoundException(`Review with ID ${updateDto.id} not found.`);
        try {
            return await this.reviewRepository.save(updatedReview);
        } catch (error) {
            throw new RequestTimeoutException('An error occurred while updating the review.');
        }
    }
    
    
}
