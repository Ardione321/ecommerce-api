import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/categories.entity';

@Injectable()
export class FindAllProductProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async findAllProductProvider(categoryId?: number): Promise<Product[]> {
        let products: Product[] = [];
        try {
            const options: any = {};
            if (categoryId) {
                options.where = { category: { id: categoryId } };
            }
            products = await this.productRepository.find(options);
            if (!products.length) {
                throw new ConflictException('No products found in database.');
            }
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return products;
    }
}
