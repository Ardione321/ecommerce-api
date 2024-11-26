import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min, MaxLength, IsEnum } from 'class-validator';
import { ReviewRatingEnum } from '../enums/review-rating-enum';

export class CreateReviewsDto {
    @IsNotEmpty()
    @IsInt()
    userId: number; // Assuming you will pass the user's ID

    @IsNotEmpty()
    @IsInt()
    productId: number; // Assuming you will pass the product's ID

    @IsNotEmpty()
    @IsEnum(ReviewRatingEnum)
    rating: ReviewRatingEnum; // Rating between 0 and 5

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    comment: string; // Limits comment length to 500 characters
}
