import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductProvider } from './providers/create-product.provider';
import { FindProductByIdProvider } from './providers/find-product-by-id.provider';
import { FindAllProductProvider } from './providers/find-all-product.provider';
import { UpdateProductByIdProvider } from './providers/update-product-by-id.provider';
import { DeleteProductByIdProvider } from './providers/delete-product-by-id.provider';
import { ReactivateProductByIdProvider } from './providers/reactivate-product-by-id.provider';
import { CreateManyProductsProvider } from './providers/create-many-products.provider';
import { CategoriesModule } from 'src/categories/categories.module';
import { Categories } from 'src/categories/categories.entity';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService, 
    CreateProductProvider, 
    FindProductByIdProvider, 
    FindAllProductProvider, 
    UpdateProductByIdProvider, 
    DeleteProductByIdProvider, 
    ReactivateProductByIdProvider, 
    CreateManyProductsProvider
  ],
  imports: [
    TypeOrmModule.forFeature([Product, Categories]),
    forwardRef(() => CategoriesModule),
  ],
})
export class ProductsModule {}
