import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';

@Injectable()
export class ReactivateOrderByIdProvider {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository : Repository<Order>
    ) {}

    public async reactivateOrderById(id: number) : Promise<Order> {
        let order : Order = undefined;
        try {
            order = await this.orderRepository.findOne({ where: { id: id }, withDeleted: true });
            if(!order || !order.deletedAt) {
                throw new NotFoundException(`Order with ID ${id} not found or already activated`);
            }
            order.deletedAt = null;
            await this.orderRepository.save(order);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return order;
    }
}
