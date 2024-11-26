import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../review.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteReviewsByIdProvider {
    constructor(
        @InjectRepository(Review)
        private readonly reviewsRepository : Repository<Review>,
    ) {}

    public async deleteReviewById(id: number) : Promise<{ deleted: boolean; id: number }> {
        let existingReview = undefined;
        try {
            existingReview = await this.reviewsRepository.softDelete(id);
            if(!existingReview) throw new NotFoundException(`Review with ID ${id} not found`);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return { deleted: true, id };
    }
}
