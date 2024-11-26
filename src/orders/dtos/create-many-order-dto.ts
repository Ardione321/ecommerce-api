import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order-dto";
import { PartialType } from "@nestjs/mapped-types";

export class CreateManyOrdersDto extends PartialType(CreateOrderDto) {
    @ApiProperty({
        description: 'Array of orders to be created',
        type: [CreateOrderDto],
        required: true,
        example: [
            {
                userId: 1,
                shippingAddress: "123 Main St, Cityville",
                status: "PENDING",
                totalAmount: 150.75,
                orderItems: [
                    { productId: 1, quantity: 2, description: "Special instructions" },
                    { productId: 2, quantity: 1 }
                ]
            },
            {
                userId: 2,
                shippingAddress: "456 Elm St, Townsville",
                status: "CONFIRMED",
                totalAmount: 75.50,
                orderItems: [
                    { productId: 3, quantity: 1 }
                ]
            }
        ]
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderDto)
    orders: CreateOrderDto[];
}
