import { PartialType, ApiProperty } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({
        description: 'Unique identifier of the category to update',
        type: Number,
        required: false,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}
