import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewsDto } from './dtos/create-reviews.dto';
import { Review } from './review.entity';
import { UpdateReviewsDto } from './dtos/update-reviews.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewService : ReviewsService,
    ) {}

    @Post('create')
    public async createReviews(@Body() createReviewsDto: CreateReviewsDto) : Promise<Review> {
        return await this.reviewService.createReviews(createReviewsDto);
    }

    @Put('update')
    public async updateReviews(@Body() updateReviewsDto: UpdateReviewsDto) : Promise<Review> {
        return await this.reviewService.updateReviews(updateReviewsDto);
    }

    @Get('get-all')
    public async getReviews() : Promise<Review[]> {
        return await this.reviewService.getReviews();
    }

    @Get('get-by-id/:id')
    public async getReviewById(@Param('id') id: number) : Promise<Review> {
        return await this.reviewService.getReviewById(id);
    }

    @Delete('delete-by-id/:id')
    public async deleteReviewById(@Param('id') id: number) : Promise<{ deleted: boolean, id }> {
        return await this.reviewService.deleteReviewByid(id)
    }
}
