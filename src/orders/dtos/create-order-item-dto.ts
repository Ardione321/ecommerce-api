import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @ApiProperty({
        description: 'ID of the product',
        example: 1,
    })
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        description: 'Quantity of the product ordered',
        example: 3,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Optional description for the order item',
        example: 'Special instructions or notes',
        required: false,
    })
    @IsString()
    description?: string;
}
