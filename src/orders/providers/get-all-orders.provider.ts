import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';

@Injectable()
export class GetAllOrdersProvider {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    public async getAllOrders(): Promise<Order[]> {
        let orders: Order[] = [];
        try {
            orders = await this.orderRepository.find({ relations: ['orderItems'] });
            if (!orders || orders.length === 0) {
                throw new NotFoundException(`No existing orders found in the database`);
            } 
        } catch (error) {
            throw new RequestTimeoutException(error.message); 
        }
        return orders;
    }
}
