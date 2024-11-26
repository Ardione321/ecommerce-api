import { Order } from 'src/orders/order.entity';
import { 
    BadRequestException, 
    Injectable, 
    NotFoundException,
    RequestTimeoutException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In, QueryRunner } from 'typeorm';
import { User } from '../../users/user.entity';
import { Product } from 'src/products/product.entity';
import { CreateManyOrdersDto } from '../dtos/create-many-order-dto';
import { CreateOrderItemDto } from '../dtos/create-order-item-dto';
import { OrderItem } from '../order-item.entity';

@Injectable()export class CreateManyOrderProvider {
    private readonly MAX_RETRIES = 3
    private readonly RETRY_DELAY = 100;
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>,
        private readonly dataSource : DataSource
    ) {}

    /**
     * Creates multiple orders based on the provided data transfer object.
     * 
     * @param createManyOrderDto - The DTO containing the data for the orders to be created.
     * @returns A promise that resolves to an array of created orders.
     */
    public async createManyOrders(createManyOrderDto: CreateManyOrdersDto): Promise<Order[]> {
        // console.time('createManyOrdersExecutionTime');
        const { orders } = createManyOrderDto;
        let attempts = 0;
        if (!orders || orders.length === 0) {
            throw new BadRequestException('Order data is required');
        };  
        while (attempts < this.MAX_RETRIES) {
            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const createOrders: Order[] = [];
            try {
                const userIds = orders.map(order => order.userId);
                const users = await this.userRepository.findBy({ id: In(userIds) });
                const productsId = orders.flatMap(order => order.orderItems.map(item => item.productId));
                const products = await this.productRepository.findBy({ id: In(productsId) });
                const productsMap = new Map(products.map(product => [product.id, product]));
                for (const createOrderDto of orders) {
                    const { userId, shippingAddress, status, orderItems } = createOrderDto;
                    const user = users.find(user => user.id === userId);
                    if (!user) {
                        throw new NotFoundException(`User with ID ${userId} not found`);
                    }
                    const order = queryRunner.manager.create(Order, {
                        user,
                        shippingAddress,
                        status,
                        totalAmount: 0,
                    });
                    await queryRunner.manager.save(order);
                    const orderItemEntities = await this.createOrderItems(orderItems, order, queryRunner, productsMap);
                    const totalAmount = orderItemEntities.reduce((total, item) => total + (item.product.price * item.quantity), 0);
                    order.totalAmount = totalAmount;
                    await queryRunner.manager.save(order);
                    createOrders.push(order);
                }
                await queryRunner.commitTransaction();
                // console.timeEnd('createManyOrdersExecutionTime');
                return createOrders;
            } catch (error) {
                if (queryRunner.isTransactionActive) {
                    await queryRunner.rollbackTransaction();
                }
                attempts = await this.handleDeadlockError(error, attempts);
                console.error(`Error creating orders:`, error);
            } finally {
                await queryRunner.release();
            }
        }
        throw new RequestTimeoutException('Max retry attempts reached due to deadlock or other errors');
    }

    private async createOrderItems(
        orderItemDtos: CreateOrderItemDto[], 
        order: Order, 
        queryRunner: QueryRunner, 
        productsMap: Map<number, Product>
    ) : Promise<OrderItem[]> {
        const orderItemEntities = await Promise.all(orderItemDtos.map( async(orderItemDto) => {
            const product = productsMap.get(orderItemDto.productId);
            if(!product) {
                throw new NotFoundException(`Product with ID ${orderItemDto.productId} not found`);
            }
            if(product.stock < orderItemDto.quantity) {
                throw new NotFoundException(`Insufficient stock for product ${product.name}`);
            }
            product.stock -= orderItemDto.quantity;
            const orderItem = queryRunner.manager.create(OrderItem, {
                ...orderItemDto,
                product,
                order,
            });
            return orderItem;
        }))
        await queryRunner.manager.save(orderItemEntities);
        await queryRunner.manager.save(Array.from(productsMap.values()));
        return orderItemEntities;
    }

    private isDeadlockError(error: any) : boolean {
        return error.code === '40P01';
    }

    private delay(ms : number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private async handleDeadlockError(error: any, attempts: number): Promise<number> {
        if (this.isDeadlockError(error)) {
            attempts++;
            if (attempts < this.MAX_RETRIES) {
                console.log(`Deadlock detected, retrying... Attempt ${attempts}`);
                await this.delay(this.RETRY_DELAY);
                return attempts; 
            } else {
                throw new RequestTimeoutException('Max retry attempts reached due to deadlock');
            }
        } else {
            throw error;
        }
    }
}
