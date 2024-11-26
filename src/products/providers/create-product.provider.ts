import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product-dto';
import { Categories } from 'src/categories/categories.entity';

@Injectable()
export class CreateProductProvider {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async createProductsProvider(productDto: CreateProductDto): Promise<Product> {
        const { categoryId } = productDto
        const category : Categories = await this.categoriesRepository.findOneBy({ id: categoryId });
        if (!category) {
            throw new ConflictException('Category not found');
        }
        const product : Product = this.productRepository.create({ ...productDto, category });
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create product');
        }
    }
}
