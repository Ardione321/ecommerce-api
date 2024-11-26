import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item-dto';
import { OrderStatusEnum } from '../enums/order-status-enums';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
    @ApiProperty({
        description: 'ID of the user placing the order',
        example: 1,
    })
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        description: 'Shipping address for the order',
        example: '123 Main St, Anytown, USA',
    })
    @IsNotEmpty()
    @IsString()
    shippingAddress: string;

    @ApiProperty({
        description: 'Current status of the order',
        enum: OrderStatusEnum,
        example: OrderStatusEnum.Pending,
    })
    @IsNotEmpty()
    @IsEnum(OrderStatusEnum)
    @Transform(({ value }) => value.toUpperCase()) // Transform to uppercase
    status: OrderStatusEnum;

    @ApiProperty({
        description: 'Total amount for the order',
        example: 150.75,
    })
    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;

    @ApiProperty({
        description: 'List of order items',
        type: [CreateOrderItemDto],
    })
    @IsArray()
    orderItems: CreateOrderItemDto[];
}
