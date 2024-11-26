import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order-dto';
import { CreateManyOrdersDto } from './dtos/create-many-order-dto';
import { Order } from './order.entity';
import { UpdateOrderDto } from './dtos/update-order-dto';
import { OrderItem } from './order-item.entity';
import { UpdateOrderItemsDto } from './dtos/update-order-items.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully', type: Order })
    @ApiBody({ type: CreateOrderDto })
    @Post('create')
    public async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.ordersService.createOrder(createOrderDto);
    }

    @ApiOperation({ summary: 'Create multiple orders' })
    @ApiResponse({ status: 201, description: 'Orders created successfully', type: [Order] })
    @ApiBody({ type: CreateManyOrdersDto })
    @Post('create-many')
    public async createManyOrders(@Body() createManyOrderDto: CreateManyOrdersDto): Promise<Order[]> {
        return await this.ordersService.createManyOrder(createManyOrderDto);
    }

    @ApiOperation({ summary: 'Soft delete an order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    @ApiResponse({ status: 200, description: 'Order soft deleted successfully' })
    @Delete('soft-delete/:id')
    public async deleteOrderById(@Param('id') id: number): Promise<{ deleted: boolean; id: number }> {
        return await this.ordersService.deleteOrderById(id);
    }

    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders', type: [Order] })
    @Get('find-all')
    public async getAllOrders(): Promise<Order[]> {
        return await this.ordersService.getAllOrders();
    }

    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    @ApiResponse({ status: 200, description: 'Order retrieved successfully', type: Order })
    @Get('find-by-id/:id')
    public async getOrderById(@Param('id') id: number): Promise<Order> {
        return await this.ordersService.getOrderById(id);
    }

    @ApiOperation({ summary: 'Reactivate a soft-deleted order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    @ApiResponse({ status: 200, description: 'Order reactivated successfully', type: Order })
    @Put('reactivate-by-id/:id')
    public async reactivateOrderById(@Param('id') id: number): Promise<Order> {
        return await this.ordersService.reactivateOrder(id);
    }

    @ApiOperation({ summary: 'Update an order by ID' })
    @ApiResponse({ status: 200, description: 'Order updated successfully', type: Order })
    @ApiBody({ type: UpdateOrderDto })
    @Put('update-by-id')
    public async updateOrderById(@Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
        return await this.ordersService.updateOrderById(updateOrderDto);
    }

    @ApiOperation({ summary: 'Update an order by ID' })
    @ApiResponse({ status: 200, description: 'Order Item updated successfully', type: Order })
    @ApiBody({ type: UpdateOrderItemsDto })
    @Put('update-order-item')
    public async updateOrderItem(@Body() updateOrderItemsDto: UpdateOrderItemsDto): Promise<OrderItem[]> {
        return await this.ordersService.updateOrderItems(updateOrderItemsDto);
    }
    
}
