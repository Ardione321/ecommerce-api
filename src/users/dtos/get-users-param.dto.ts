import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersParamDto {
    @ApiPropertyOptional({
        description: "Get user with specific id",
        example: 1234  // Example ID for illustration
    })
    @IsOptional()  // Indicates that this field is optional
    @IsInt()  // Validates that the ID must be an integer
    @Type(() => Number)  // Transforms the value to a Number type if present
    id?: number;  // Optional user ID for fetching a specific user
}
