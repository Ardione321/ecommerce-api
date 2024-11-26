import { UpdateProductDto } from './dtos/update-product-dto';
import { UpdateProductByIdProvider } from './providers/update-product-by-id.provider';
import { CreateManyProductsProvider } from './providers/create-many-products.provider';
import { CreateManyProductsDto } from './dtos/create-many-products-dto';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product-dto';
import { CreateProductProvider } from './providers/create-product.provider';
import { DeleteProductByIdProvider } from './providers/delete-product-by-id.provider';
import { FindAllProductProvider } from './providers/find-all-product.provider';
import { FindProductByIdProvider } from './providers/find-product-by-id.provider';
import { ReactivateProductByIdProvider } from './providers/reactivate-product-by-id.provider';

@Injectable()
export class ProductsService {

    constructor(
       private readonly createProductProvider: CreateProductProvider,
       private readonly createManyProductsProvider: CreateManyProductsProvider,
       private readonly findAllProductProvider: FindAllProductProvider,
       private readonly findProductByIdProvider: FindProductByIdProvider,
       private readonly deleteProductByIdProvider: DeleteProductByIdProvider,
       private readonly updateProductByIdProvider: UpdateProductByIdProvider,
       private readonly reactivateProductByIdProvider: ReactivateProductByIdProvider

    ) {}

    public async createProducts(productDto: CreateProductDto): Promise<Product> {
        return await this.createProductProvider.createProductsProvider(productDto);
    }

    public async createManyProducts(createManyProducts: CreateManyProductsDto): Promise<Product[]> {
        return await this.createManyProductsProvider.createManyProductsProvider(createManyProducts);
    }

    public async findAllProducts(category?: number): Promise<Product[]> {
        return await this.findAllProductProvider.findAllProductProvider(category);
    }

    public async findProductById(id: number): Promise<Product> {
        return await this.findProductByIdProvider.findProductByIdProvider(id);
    }

    public async deleteProductById(id: number): Promise<{ deleted: boolean; id: number }> {
        return await this.deleteProductByIdProvider.deleteProductByIdProvider(id);
    }

    public async updateProductById(updateProductDto: UpdateProductDto) : Promise<Product> {
        return await this.updateProductByIdProvider.updateProductByIdProvider(updateProductDto);
    }

    public async reactivateProductById(id: number) : Promise<Product> {
        return await this.reactivateProductByIdProvider.reactivateProductByIdProvider(id);
    }
}
