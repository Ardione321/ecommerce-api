import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categories } from '../categories.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindAllCategoriesProvider {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
    ) {}

    public async findAllCategoriesProvider(): Promise<Categories[]> {
        let categories : Categories[] = [];
        try {
            categories = await this.categoriesRepository.find();
            if(!categories) {
                throw new ConflictException('No categories found in database');
            }
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return categories;
    }
}
