import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';

@Injectable()
export class DeleteOrderByIdProvider {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    public async deleteOrderById(id: number): Promise<{ deleted: boolean, id: number }> {
        let order: Order;
        try {
            order = await this.orderRepository.findOne({ where: { id }, relations: ['orderItems'] });
            if (!order) {
                throw new NotFoundException(`Order with ID ${id} not found`);
            }
            await this.orderRepository.softRemove(order);
        } catch (error) {
            throw new RequestTimeoutException(error.message);
        }
        return { deleted: true, id };
    }
}
