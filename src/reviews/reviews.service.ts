import { GetReviewsByIdProvider } from './providers/get-reviews-by-id.provider';
import { CreateReviewsDto } from './dtos/create-reviews.dto';
import { Injectable } from '@nestjs/common';
import { CreateReviewsProvider } from './providers/create-reviews.provider';
import { Review } from './review.entity';
import { UpdateReviewsProvider } from './providers/update-reviews.provider';
import { UpdateReviewsDto } from './dtos/update-reviews.dto';
import { GetReviewsProvider } from './providers/get-reviews.provider';
import { DeleteReviewsByIdProvider } from './providers/delete-reviews-by-id.provider';

@Injectable()
export class ReviewsService {
    constructor(
        private readonly createReviewsProvider : CreateReviewsProvider,
        private readonly updateReviewsProvider : UpdateReviewsProvider,
        private readonly getReviewsProvider : GetReviewsProvider,
        private readonly getReviewsByIdProvider : GetReviewsByIdProvider,
        private readonly deleteReviewsByIdProvider : DeleteReviewsByIdProvider,
    ) {}

    public async createReviews(createReviewsDto: CreateReviewsDto) : Promise<Review> {
        return await this.createReviewsProvider.createReviews(createReviewsDto);
    }

    public async updateReviews(updateReviewsDto: UpdateReviewsDto) : Promise<Review> {
        return await this.updateReviewsProvider.updateReview(updateReviewsDto);
    }

    public async getReviews() : Promise<Review[]> {
        return await this.getReviewsProvider.getReviews();
    }

    public async getReviewById(id: number) : Promise<Review> {
        return await this.getReviewsByIdProvider.getReviewById(id);
    }

    public async deleteReviewByid(id: number) : Promise<{ deleted: boolean, id: number }> {
        return await this.deleteReviewsByIdProvider.deleteReviewById(id);
    }
}
