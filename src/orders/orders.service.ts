import { UpdateOrderItemProvider } from './providers/update-order-item.provider';
import { CreateManyOrdersDto } from './dtos/create-many-order-dto';
import { Injectable } from '@nestjs/common';
import { CreateOrderProvider } from './providers/create-order.provider';
import { CreateOrderDto } from './dtos/create-order-dto';
import { Order } from './order.entity';
import { CreateManyOrderProvider } from './providers/create-many-order.provider';
import { DeleteOrderByIdProvider } from './providers/delete-order-by-id.provider';
import { GetAllOrdersProvider } from './providers/get-all-orders.provider';
import { GetOrderByIdProvider } from './providers/get-order-by-id.provider';
import { UpdateOrderByIdProvider } from './providers/update-order-by-id.provider';
import { ReactivateOrderByIdProvider } from './providers/reactivate-by-id.provider';
import { UpdateOrderDto } from './dtos/update-order-dto';
import { OrderItem } from './order-item.entity';
import { UpdateOrderItemsDto } from './dtos/update-order-items.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly createOrderProvider: CreateOrderProvider,
        private readonly createManyOrderProvider: CreateManyOrderProvider,
        private readonly deleteOrderByIdProvider: DeleteOrderByIdProvider,
        private readonly getAllOrdersProvider: GetAllOrdersProvider,
        private readonly getOrderByIdProvider: GetOrderByIdProvider,
        private readonly updateOrderByIdProvider: UpdateOrderByIdProvider,
        private readonly updateOrderItemProvider: UpdateOrderItemProvider,
        private readonly reactivateOrderByIdProvider: ReactivateOrderByIdProvider,
    ) {}

    public async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.createOrderProvider.createOrder(createOrderDto);
    }

    public async createManyOrder(createManyOrderDto: CreateManyOrdersDto): Promise<Order[]> {
        return await this.createManyOrderProvider.createManyOrders(createManyOrderDto);
    }

    public async deleteOrderById(id: number) : Promise<{ deleted: boolean, id: number}> { 
        return await this.deleteOrderByIdProvider.deleteOrderById(id);
    }   
    
    public async getAllOrders() : Promise<Order[]> {
        return await this.getAllOrdersProvider.getAllOrders();
    }

    public async getOrderById(id: number) : Promise<Order> {
        return await this.getOrderByIdProvider.getOrderById(id);
    }

    public async updateOrderById(updateOrderDto: UpdateOrderDto) : Promise<Order> {
        return await this.updateOrderByIdProvider.updateOrderById(updateOrderDto);
    }

    public async updateOrderItems(updateOrderItemsDto: UpdateOrderItemsDto) : Promise<OrderItem[]> {
        return await this.updateOrderItemProvider.updateOrderItems(updateOrderItemsDto);
    }

    public async reactivateOrder(id: number) : Promise<Order> {
        return await this.reactivateOrderByIdProvider.reactivateOrderById(id);
    }

}
