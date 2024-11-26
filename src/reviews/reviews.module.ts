import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewsProvider } from './providers/create-reviews.provider';
import { UpdateReviewsProvider } from './providers/update-reviews.provider';
import { GetReviewsProvider } from './providers/get-reviews.provider';
import { GetReviewsByIdProvider } from './providers/get-reviews-by-id.provider';
import { DeleteReviewsByIdProvider } from './providers/delete-reviews-by-id.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, CreateReviewsProvider, UpdateReviewsProvider, GetReviewsProvider, GetReviewsByIdProvider, DeleteReviewsByIdProvider],
  imports: [TypeOrmModule.forFeature([Review, User, Product])]
})
export class ReviewsModule {}
