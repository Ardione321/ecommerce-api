import { BadRequestException, ConflictException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { CreateOrderDto } from '../dtos/create-order-dto';
import { Order } from '../order.entity';
import { OrderItem } from '../order-item.entity';
import { User } from '../../users/user.entity';
import { Product } from '../../products/product.entity';
import { CreateOrderItemDto } from '../dtos/create-order-item-dto';

@Injectable()
export class CreateOrderProvider {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        if (!createOrderDto) {
            throw new BadRequestException('Order data is required.');
        }
        const { userId, shippingAddress, status, orderItems } = createOrderDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const order = queryRunner.manager.create(Order, {
                user,
                shippingAddress,
                status,
                totalAmount: 0,
            });
            await queryRunner.manager.save(order);
            const orderItemsEntities = await this.createOrderItems(orderItems, order, queryRunner);
            order.totalAmount = orderItemsEntities.reduce((total, item) => total + item.product.price * item.quantity, 0);
            await queryRunner.manager.save(order);
            for (const orderItem of orderItemsEntities) {
                const product = await this.productRepository.findOneBy({ id: orderItem.product.id });
                if (!product) {
                    throw new NotFoundException(`Product with ID ${orderItem.product.id} not found.`);
                }
                if (product.stock < orderItem.quantity) {
                    throw new ConflictException(`
                    Insufficient stock for product ${product.name}. 
                    Available: ${product.stock}, 
                    Requested: ${orderItem.quantity}`
                    );
                }
                product.stock -= orderItem.quantity;
                await queryRunner.manager.save(product);
            }
            await queryRunner.manager.save(orderItemsEntities);
            await queryRunner.commitTransaction();
            return order;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    private async createOrderItems(
        orderItemDtos: CreateOrderItemDto[],
        order: Order,
        queryRunner: QueryRunner
    ): Promise<OrderItem[]> {
        const orderItemEntities = await Promise.all(
            orderItemDtos.map(async (orderItemDto) => {
                const product = await this.productRepository.findOneBy({ id: orderItemDto.productId });
                if (!product) {
                    throw new NotFoundException(`Product with ID ${orderItemDto.productId} not found.`);
                }

                return queryRunner.manager.create(OrderItem, {
                    ...orderItemDto,
                    product,
                    order,
                });
            })
        );
        return orderItemEntities;
    }
}
