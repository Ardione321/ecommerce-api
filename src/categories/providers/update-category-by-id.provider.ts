import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from '../categories.entity';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateCategoryByIdProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async updateCategoryByIdProvider(updateCategoryDto: UpdateCategoryDto): Promise<Categories> {
        let existingCategory : Categories = undefined;
        try {
            existingCategory = await this.categoriesRepository.preload({
                id: updateCategoryDto.id,
                ...updateCategoryDto
            })
            if(!existingCategory) {
                throw new ConflictException('Category not found');
            }
            return await this.categoriesRepository.save(existingCategory);
        } catch (error) {            
            throw new RequestTimeoutException(error);
        }
    }
}
