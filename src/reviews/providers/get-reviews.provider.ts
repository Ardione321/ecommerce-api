import {  Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review.entity';

@Injectable()
export class GetReviewsProvider {
    constructor(
        @InjectRepository(Review)
        private readonly reviewsRepository : Repository<Review>
    ) {}

    public async getReviews() : Promise<Review[]> {
        let reviews : Review[] = []
        try {
            reviews = await this.reviewsRepository.find()
            if(reviews.length === 0) throw new NotFoundException('No Reviews found in database');
        } catch (error) {
            throw new RequestTimeoutException(error)
        }
        return reviews
    }
}
