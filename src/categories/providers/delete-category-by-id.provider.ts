import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from '../categories.entity';

@Injectable()
export class DeleteCategoryByIdProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>
    ) {}

    public async deleteCategoryById(id: number) : Promise<{ deleted: boolean, id: number }> {
        let category = undefined;
        try {
            category = await this.categoriesRepository.softDelete(id);
            if (!category) {
                throw new ConflictException('Category not found');
            }
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return { deleted: true, id }
    }
}
