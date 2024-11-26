import { forwardRef, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryProvider } from './providers/create-category.provider';
import { CreateManyCategoriesProvider } from './providers/create-many-categories.provider';
import { FindAllCategoriesProvider } from './providers/find-all-categories.provider';
import { FindCategoryByIdProvider } from './providers/find-category-by-id.provider';
import { UpdateCategoryByIdProvider } from './providers/update-category-by-id.provider';
import { DeleteCategoryByIdProvider } from './providers/delete-category-by-id.provider';
import { ReactivateCategoryByIdProvider } from './providers/reactivate-category-by-id.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/product.entity';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService, 
    CreateCategoryProvider, 
    CreateManyCategoriesProvider, 
    FindAllCategoriesProvider, 
    FindCategoryByIdProvider, 
    UpdateCategoryByIdProvider, 
    DeleteCategoryByIdProvider, 
    ReactivateCategoryByIdProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Categories, Product]),
    forwardRef(() => ProductsModule),
  ],
  exports: [CategoriesService],
})
export class CategoriesModule {}
