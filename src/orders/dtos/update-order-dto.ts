import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatusEnum } from '../enums/order-status-enums';
import { Transform } from 'class-transformer';

export class UpdateOrderDto {
    @ApiProperty({
        description: 'ID of the order to be updated',
        example: 1,
    })
    @IsNotEmpty()
    orderId: number;

    @ApiPropertyOptional({
        description: 'Shipping address for the order',
        example: '123 Main St, Anytown, USA',
    })
    @IsOptional()
    @IsString()
    shippingAddress?: string;

    @ApiPropertyOptional({
        description: 'Current status of the order',
        enum: OrderStatusEnum,
        example: OrderStatusEnum.Pending,
    })
    @IsOptional()
    @IsEnum(OrderStatusEnum)
    @Transform(({ value }) => value.toUpperCase())
    status?: OrderStatusEnum;

    @ApiPropertyOptional({
        description: 'Total amount for the order',
        example: 150.75,
    })
    @IsOptional()
    @IsNumber()
    totalAmount?: number;
}
