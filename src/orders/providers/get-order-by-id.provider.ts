import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';

@Injectable()
export class GetOrderByIdProvider {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository : Repository<Order>
    ) {}

    public async getOrderById(id: number) : Promise<Order> {
        let order : Order = undefined;
        try {
            order = await this.orderRepository.findOne({ where: { id }, relations: ['orderItems'] })
            if(!order) {
                throw new NotFoundException(`Order with ID ${id} not found`);
            }
        } catch(error) {
            throw new RequestTimeoutException(error)
        }
        return order;
    }
}
