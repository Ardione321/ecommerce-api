import { UpdateOrderItemsDto } from '../dtos/update-order-items.dto';
import { Injectable, RequestTimeoutException, NotFoundException } from '@nestjs/common';
import { OrderItem } from '../order-item.entity';
import { DataSource } from 'typeorm';
import { Order } from '../order.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class UpdateOrderItemProvider {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    public async updateOrderItems(updateOrderItemsDto: UpdateOrderItemsDto): Promise<OrderItem[]> {
        const orderItems = updateOrderItemsDto.items;
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const promises = orderItems.map(async (orderItemUpdate) => {
                // Step 1: Find the existing order item by its ID
                const existingOrderItem = await queryRunner.manager.findOne(OrderItem, {
                    where: { id: orderItemUpdate.id },
                    relations: ['order', 'product'], // Include the order and product relation
                });

                // Step 2: Check if the order item exists
                if (!existingOrderItem) {
                    throw new NotFoundException(`Order item with ID ${orderItemUpdate.id} not found`);
                }

                // Step 3: Verify the orderId matches the existing order
                if (orderItemUpdate.orderId !== existingOrderItem.order.id) {
                    throw new NotFoundException(`Order ID ${orderItemUpdate.orderId} does not match with the existing order ID ${existingOrderItem.order.id}`);
                }

                // Step 4: Store the old quantity and price for calculations
                const oldQuantity = existingOrderItem.quantity;
                const productPrice = existingOrderItem.product.price;

                // Step 5: Update the fields based on the provided data
                if (orderItemUpdate.quantity !== undefined) {
                    const quantityDifference = orderItemUpdate.quantity - oldQuantity;

                    // Step 6: Update the quantity and adjust product stock
                    existingOrderItem.quantity = orderItemUpdate.quantity;
                    
                    // Adjust the product stock
                    const product = existingOrderItem.product; // Product already fetched
                    product.stock -= quantityDifference; // Adjust stock based on the difference

                    // Ensure product stock doesn't go negative
                    if (product.stock < 0) {
                        throw new NotFoundException(`Not enough stock for Product ID ${orderItemUpdate.productId}`);
                    }

                    // Step 7: Update the product stock in the database
                    await queryRunner.manager.save(product);
                }
                
                // Step 8: Update totalAmount in the order
                const totalPriceDifference = (orderItemUpdate.quantity - oldQuantity) * productPrice;
                const order = existingOrderItem.order;
                order.totalAmount = Number(order.totalAmount) + totalPriceDifference; // Ensure it’s a number

                // Step 9: Save the updated order
                await queryRunner.manager.save(order);

                // Step 10: Save the updated order item
                return queryRunner.manager.save(existingOrderItem);
            });

            // Wait for all promises to resolve
            const updatedOrderItems = await Promise.all(promises);

            // Step 11: Commit the transaction
            await queryRunner.commitTransaction();

            return updatedOrderItems; // Return the updated order items
        } catch (error) {
            await queryRunner.rollbackTransaction(); // Rollback on error
            throw new RequestTimeoutException(error);
        } finally {
            await queryRunner.release(); // Release the query runner
        }
    }
}
