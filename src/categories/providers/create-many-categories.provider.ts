import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Categories } from '../categories.entity';
import { CreateManyCategoriesDto } from '../dtos/create-many-category.dto';

@Injectable()
export class CreateManyCategoriesProvider {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    public async createManyCategoriesProvider(createManyCategoriesDto: CreateManyCategoriesDto): Promise<Categories[]> {
        const createdCategories: Categories[] = [];
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            for (const categoryDto of createManyCategoriesDto.categories) {
                const category = await this.createCategory(queryRunner, categoryDto);
                createdCategories.push(category);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await this.handleTransactionError(queryRunner, error);
            throw error; 
        } finally {
            await this.releaseQueryRunner(queryRunner);
        }
        return createdCategories;
    }

    private async createCategory(queryRunner: any, categoryDto: Partial<Categories>): Promise<Categories> {    
        try {
            const existingCategory = await queryRunner.manager.findOneBy(Categories, { name: categoryDto.name });
            if (existingCategory) {
                throw new ConflictException('Category already exists');
            }  
            const category = await queryRunner.manager.create(Categories, categoryDto);
            return await queryRunner.manager.save(category);
        } catch (error) {
            throw new ConflictException('Failed to create category', error.message);
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
