import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Categories } from '../categories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindCategoryByIdProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async findCategoryByIdProvider(id: number): Promise<Categories> {
        let category : Categories = undefined;
        try {
            category = await this.categoriesRepository.findOneBy({ id});
            if(!category) {
                throw new ConflictException('Category not found');
            }
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return category;
    }
}
