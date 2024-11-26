import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateManyProductsDto } from '../dtos/create-many-products-dto';
import { Product } from '../product.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Categories } from 'src/categories/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../dtos/create-product-dto'; // Import CreateProductDto

@Injectable()
export class CreateManyProductsProvider {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}
    
    public async createManyProductsProvider(createManyProductsDto: CreateManyProductsDto): Promise<Product[]> {
        const { products } = createManyProductsDto;
        const createdProducts: Product[] = [];
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            for (const productDto of products) {
                const product = await this.createProduct(queryRunner, productDto);
                createdProducts.push(product);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await this.handleTransactionError(queryRunner, error);
            throw error;
        } finally {
            await this.releaseQueryRunner(queryRunner);
        }
        return createdProducts;
    }

    private async createProduct(queryRunner: QueryRunner, productDto: CreateProductDto): Promise<Product> {
        const { categoryId } = productDto
        try {
            const category = await this.categoriesRepository.findOneBy({ id: categoryId });
            if (!category) {
                throw new ConflictException('Category not found');
            }
            const newProduct = queryRunner.manager.create(Product, { ...productDto, category });
            return await queryRunner.manager.save(newProduct);
        } catch (error) {
            throw new ConflictException('Failed to create product', error.message);
        }
    }

    private async handleTransactionError(queryRunner: any, error: any): Promise<void> {
        try {
            await queryRunner.rollbackTransaction();
        } catch (rollbackError) {
            throw new RequestTimeoutException(rollbackError.message || 'Rollback failed');
        }
    }

    private async releaseQueryRunner(queryRunner: any): Promise<void> {
        try {
            await queryRunner.release();
        } catch (releaseError) {
            throw new RequestTimeoutException(releaseError.message || 'Failed to release query runner');
        }
    }
}
