import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";

export class CreateManyCategoriesDto {
    @ApiProperty({
        type: [CreateCategoryDto], // Updated to reference CreateCategoryDto
        required: true,
        description: 'An array of categories to be created',
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCategoryDto)
    categories: CreateCategoryDto[];
}
