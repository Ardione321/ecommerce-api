import { Injectable, NotFoundException, RequestTimeoutException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order.entity';
import { UpdateOrderDto } from '../dtos/update-order-dto';


@Injectable()
export class UpdateOrderByIdProvider {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    public async updateOrderById(updateOrderDto: UpdateOrderDto): Promise<Order> {
        let existingOrder : Order = undefined;
        try {
            existingOrder = await this.orderRepository.preload({ id: updateOrderDto.orderId, ...updateOrderDto })
            if(!existingOrder) {
                throw new ConflictException('Failed to find product');
            }
            return await this.orderRepository.save(existingOrder);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
    }
}
