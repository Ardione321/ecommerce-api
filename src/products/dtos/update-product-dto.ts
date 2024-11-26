import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { CreateProductDto } from "./create-product-dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty({
        description: 'Unique identifier for the product to be updated',
        type: Number,
    })
    @IsInt()
    @IsNotEmpty()
    id: number;
}
