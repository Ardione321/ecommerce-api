import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReactivateProductByIdProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async reactivateProductByIdProvider(id: number): Promise<Product> {
        let product : Product = undefined;
        try {
            product = await this.productRepository.findOne({where: { id }, withDeleted: true});
            if(!product || !product.deletedAt) {
                throw new ConflictException('Product not found');
            }
            product.deletedAt = null;
            await this.productRepository.save(product);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return product;
    }
}
