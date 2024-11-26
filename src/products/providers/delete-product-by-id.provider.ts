import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteProductByIdProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async deleteProductByIdProvider(id: number): Promise<{ deleted: boolean; id: number }> {
        let product = undefined;
        try {
            product = await this.productRepository.findOneBy({ id });
            if (!product) {
                throw new ConflictException('Failed to find product');
            }
            await this.productRepository.softDelete(id);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return { deleted: true, id}
    }
}
