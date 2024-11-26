import { FindCategoryByIdProvider } from './providers/find-category-by-id.provider';
import { Injectable } from '@nestjs/common';
import { CreateCategoryProvider } from './providers/create-category.provider';
import { Categories } from './categories.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateManyCategoriesProvider } from './providers/create-many-categories.provider';
import { DeleteCategoryByIdProvider } from './providers/delete-category-by-id.provider';
import { CreateManyCategoriesDto } from './dtos/create-many-category.dto';
import { ReactivateCategoryByIdProvider } from './providers/reactivate-category-by-id.provider';
import { FindAllCategoriesProvider } from './providers/find-all-categories.provider';
import { UpdateCategoryByIdProvider } from './providers/update-category-by-id.provider';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly createCategoryProvider: CreateCategoryProvider,
    
        private readonly createManyCategoryProvider: CreateManyCategoriesProvider,

        private readonly deleteCategoryByIdProvider: DeleteCategoryByIdProvider,

        private readonly findAllCategoriesProvider: FindAllCategoriesProvider,

        private readonly findCategoryByIdProvider: FindCategoryByIdProvider,

        private readonly updateCategoryByIdProvider: UpdateCategoryByIdProvider,

        private readonly reactivateCategoryByIdProvider: ReactivateCategoryByIdProvider

        
    ){}

    public async createCategory(createCategoryDto: CreateCategoryDto) : Promise<Categories> {
        return await this.createCategoryProvider.createCategory(createCategoryDto);
    }

    public async createManyCategories(createManyCategoriesDto: CreateManyCategoriesDto) : Promise<Categories[]> {
        return await this.createManyCategoryProvider.createManyCategoriesProvider(createManyCategoriesDto);
    }

    public async deleteCategoryById(id: number) : Promise<{ deleted: boolean, id: number} > {
        return await this.deleteCategoryByIdProvider.deleteCategoryById(id);
    }

    public async findAllCategories() : Promise<Categories[]> {
        return await this.findAllCategoriesProvider.findAllCategoriesProvider();
    }

    public async findCategoryById(id: number) : Promise<Categories> {
        return await this.findCategoryByIdProvider.findCategoryByIdProvider(id);
    }

    public async updateCategoryById(updateCategoryDto: UpdateCategoryDto) : Promise<Categories> {
        return await this.updateCategoryByIdProvider.updateCategoryByIdProvider(updateCategoryDto);
    }

    public async reactivateCategoryById(id: number) : Promise<Categories> {
        return await this.reactivateCategoryByIdProvider.reactivateCategoryByIdProvider(id);
    }

}
