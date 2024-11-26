import { ConflictException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Review } from '../review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetReviewsByIdProvider {
    constructor(
        @InjectRepository(Review)
        private readonly reviewsRepository : Repository<Review>,
    ) {}

    public async getReviewById(id: number) : Promise<Review> {
        let review : Review = undefined;
        try {
            review = await this.reviewsRepository.findOneBy({ id });
            if(!review) throw new NotFoundException(`Review with ID ${id} not found.`);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return review;
    }
}
