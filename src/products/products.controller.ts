import { CreateManyProductsDto } from './dtos/create-many-products-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product-dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dtos/update-product-dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@ApiTags('products')  // Tagging the controller for Swagger UI
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.', type: Product })
    @ApiBody({ type: CreateProductDto })
    public async createProducts(@Body() productDto: CreateProductDto): Promise<Product> {
        return this.productService.createProducts(productDto);
    }

    @Post('create-many')
    @ApiOperation({ summary: 'Create multiple products' })
    @ApiResponse({ status: 201, description: 'Products created successfully.', type: [Product] })
    @ApiBody({ type: CreateManyProductsDto })
    @Auth(AuthType.None)
    public async createManyProducts(@Body() createManyProductDto: CreateManyProductsDto): Promise<Product[]> {
        return this.productService.createManyProducts(createManyProductDto);
    }

    @Get('/all/:id?')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Retrieve all products, optionally filtered by category ID' })
    @ApiResponse({ status: 200, description: 'List of products retrieved successfully.', type: [Product] })
    @ApiParam({ name: 'id', required: false, description: 'Optional category ID to filter products', type: Number })
    public async findAllProducts(@Param('id', ParseIntPipe) category?: number): Promise<Product[]> {
        return this.productService.findAllProducts(category);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Find a product by ID' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', description: 'ID of the product to retrieve', type: Number })
    public async findProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.findProductById(id);
    }

    @Put('/reactivate/:id')
    @ApiOperation({ summary: 'Reactivate a product by ID' })
    @ApiResponse({ status: 200, description: 'Product reactivated successfully.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', description: 'ID of the product to reactivate', type: Number })
    public async reactivateProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.reactivateProductById(id);
    }

    @Put('update')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiBody({ type: UpdateProductDto })
    public async updateProductById(@Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productService.updateProductById(updateProductDto);
    }

    @Delete('soft-delete')
    @ApiOperation({ summary: 'Soft delete a product by ID' })
    @ApiResponse({ status: 200, description: 'Product soft deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiQuery({ name: 'id', description: 'ID of the product to delete', type: Number })
    public async deleteProductById(@Query('id', ParseIntPipe) id: number): Promise<{ deleted: boolean; id: number }> {
        return this.productService.deleteProductById(id);
    }
}
