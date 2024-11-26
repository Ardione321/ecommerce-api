// bulk-create.provider.ts
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

@Injectable()
export class BulkCreateProvider<T extends ObjectLiteral> {
    constructor(
        protected readonly dataSource: DataSource,
    ) {}

    public async createMany(createManyDto: { items: Partial<T>[] }, entity: EntityTarget<T>, 
        createFn: (item: Partial<T>, queryRunner: any) => Promise<T>): Promise<T[]> {
        const createdItems: T[] = [];
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (const itemDto of createManyDto.items) {
                const item = await createFn(itemDto, queryRunner);
                createdItems.push(item);
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await this.handleTransactionError(queryRunner, error);
        } finally {
            await this.releaseQueryRunner(queryRunner);
        }

        return createdItems;
    }

    protected async handleTransactionError(queryRunner: any, error: any): Promise<void> {
        try {
            await queryRunner.rollbackTransaction();
        } catch (rollbackError) {
            throw new RequestTimeoutException(rollbackError.message || 'Rollback failed');
        }
        // Optionally, you can log the original error here
        throw new ConflictException('Transaction failed', error.message);
    }

    protected async releaseQueryRunner(queryRunner: any): Promise<void> {
        try {
            await queryRunner.release();
        } catch (releaseError) {
            throw new RequestTimeoutException(releaseError.message || 'Failed to release query runner');
        }
    }
}
