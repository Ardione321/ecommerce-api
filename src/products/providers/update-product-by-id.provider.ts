import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from '../dtos/update-product-dto';

@Injectable()
export class UpdateProductByIdProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async updateProductByIdProvider(updateProductDto: UpdateProductDto): Promise<Product> {
        let existingProduct : Product = undefined;
        const { id } = updateProductDto;
        try {
            existingProduct = await this.productRepository.preload({
                id: id,
                ...updateProductDto,
            });
            if (!existingProduct) {
                throw new ConflictException('Failed to find product');  
            }
            return await this.productRepository.save(existingProduct);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
    }
}
