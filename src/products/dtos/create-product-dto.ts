import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, MaxLength, MinLength, ArrayMaxSize, ArrayMinSize, IsOptional } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        description: 'Name of the product',
        minLength: 3,
        maxLength: 255,
    })
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;

    @ApiProperty({
        description: 'Price of the product',
        type: Number,
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Description of the product',
        maxLength: 1025,
    })
    @IsString()
    @MaxLength(1025)
    description: string;

    @ApiProperty({
        description: 'ID of the category to which the product belongs',
        type: Number,
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        description: 'Available stock of the product',
        type: Number,
    })
    @IsNumber()
    stock: number;

    @ApiPropertyOptional({
        description: 'Array of image URLs for the product',
        type: [String],
        minItems: 1,
        maxItems: 5,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1) // Ensure at least one image is provided
    @ArrayMaxSize(5) // Set a maximum size for the array if desired
    @MaxLength(1025, { each: true }) // Validate each string's maximum length
    images?: string[];
}
