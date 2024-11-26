import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product-dto";

export class CreateManyProductsDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        type: [CreateProductDto], // Updated to reference CreateProductDto
        required: true,
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductDto)
    products: CreateProductDto[];
}
