import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from '../categories.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReactivateCategoryByIdProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async reactivateCategoryByIdProvider(id:number) : Promise<Categories> {
        let category: Categories = undefined;
        try {
            category = await this.categoriesRepository.findOne({where: { id }, withDeleted: true });
            if(!category || !category.deletedAt) {
                throw new ConflictException('Category not found');
            }
            category.deletedAt = null;
            await this.categoriesRepository.save(category);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return category;
    }
}
