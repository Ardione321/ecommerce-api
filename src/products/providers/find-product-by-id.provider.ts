import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindProductByIdProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    public async findProductByIdProvider(id: number) : Promise<Product> {
        let product = undefined;
        try {
            product = await this.productRepository.findOneBy({ id });
            if(!product) {
                throw new ConflictException('Failed to find product');
            }
        } catch (error) {
            throw new RequestTimeoutException(error);
        } 
        return product;
    }
}
