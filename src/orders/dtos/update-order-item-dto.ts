import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderItemDto {
    @ApiProperty({
        description: 'ID of the order item to be updated',
        example: 32113, // Example of an existing order item ID
    })
    @IsNotEmpty()
    id: number; // Changed from orderItemId to id to match the entity

    @ApiPropertyOptional({
        description: 'Description of the order item',
        example: 'A detailed description of the product',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Quantity of the order item',
        example: 2,
    })
    @IsOptional()
    @IsNumber()
    quantity?: number;

    @ApiPropertyOptional({
        description: 'ID of the product associated with the order item',
        example: 101,
    })
    @IsOptional()
    @IsNumber()
    productId?: number; // Keep this for convenience

    @ApiPropertyOptional({
        description: 'ID of the order associated with the order item',
        example: 101,
    })
    @IsOptional()
    @IsNumber()
    orderId?: number; // Keep this for convenience
}
