import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewsDto } from "./create-reviews.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateReviewsDto extends PartialType(CreateReviewsDto) {
    @ApiProperty({
        description: "Unique identifier for the Review",
        example: 1,
    })
    @IsInt({ message: 'Review ID must be an integer.' })  
    @IsNotEmpty({ message: 'Review ID cannot be empty.' })
    id: number;
}
