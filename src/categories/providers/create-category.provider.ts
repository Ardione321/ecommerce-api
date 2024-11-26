import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Categories } from '../categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateCategoryProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRespository: Repository<Categories>,
    ) {}

    public async createCategory(createCategoryDto: CreateCategoryDto) : Promise<Categories> {
        let category : Categories = undefined;
        try {
            category = await this.categoriesRespository.findOneBy({ name: createCategoryDto.name });
            if(category) throw new ConflictException('Category already exists');
            category = this.categoriesRespository.create(createCategoryDto);
            return await this.categoriesRespository.save(category);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
    }
}
