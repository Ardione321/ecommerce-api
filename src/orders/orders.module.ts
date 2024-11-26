import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';
import { CreateOrderProvider } from './providers/create-order.provider';
import { CreateManyOrderProvider } from './providers/create-many-order.provider';
import { UpdateOrderByIdProvider } from './providers/update-order-by-id.provider';
import { DeleteOrderByIdProvider } from './providers/delete-order-by-id.provider';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { GetOrderByIdProvider } from './providers/get-order-by-id.provider';
import { GetAllOrdersProvider } from './providers/get-all-orders.provider';
import { ReactivateOrderByIdProvider } from './providers/reactivate-by-id.provider';
import { UpdateOrderItemProvider } from './providers/update-order-item.provider';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService, 
    CreateOrderProvider, 
    CreateManyOrderProvider, 
    UpdateOrderByIdProvider, 
    DeleteOrderByIdProvider, 
    GetOrderByIdProvider, 
    GetAllOrdersProvider, 
    ReactivateOrderByIdProvider, UpdateOrderItemProvider
  ],
  imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])]
})
export class OrdersModule {}
