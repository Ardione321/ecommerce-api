import { CreateManyCategoriesDto } from './dtos/create-many-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Categories } from './categories.entity';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Categories') // Tag for categorizing the endpoints in Swagger UI
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all categories' }) // Description for this operation
    @ApiResponse({ status: 200, description: 'List of categories', type: [Categories] })
    public async findAllCategories() : Promise<Categories[]> {
        return await this.categoriesService.findAllCategories();
    }

    @Post('create')
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category successfully created', type: Categories })
    @Auth(AuthType.None)
    public async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.createCategory(createCategoryDto);
    }

    @Post('create-many')
    @ApiOperation({ summary: 'Create multiple categories' })
    @ApiResponse({ status: 201, description: 'Categories successfully created', type: [Categories] })
    @Auth(AuthType.None)
    public async createManyCategories(@Body() createManyCategoriesDto: CreateManyCategoriesDto) {
        return await this.categoriesService.createManyCategories(createManyCategoriesDto);
    }

    @Get('/id/:id')
    @ApiOperation({ summary: 'Retrieve a category by ID' })
    @ApiResponse({ status: 200, description: 'Category found', type: Categories })
    @ApiResponse({ status: 404, description: 'Category not found' })
    public async findCategoryById(@Param('id') id: number) : Promise<Categories> {
        return await this.categoriesService.findCategoryById(id);
    }

    @Delete('/soft-delete/:id')
    @ApiOperation({ summary: 'Soft delete a category by ID' })
    @ApiResponse({ status: 200, description: 'Category successfully deleted'})
    @ApiResponse({ status: 404, description: 'Category not found' })
    public async deleteCategoryById(@Param('id') id: number) : Promise<{ deleted: boolean, id: number }> {
        return await this.categoriesService.deleteCategoryById(id);
    }

    @Put('/reactivate/:id')
    @ApiOperation({ summary: 'Reactivate a soft-deleted category by ID' })
    @ApiResponse({ status: 200, description: 'Category successfully reactivated', type: Categories })
    @ApiResponse({ status: 404, description: 'Category not found' })
    public async reactivateCategoryById(@Param('id') id: number) : Promise<Categories> {
        return await this.categoriesService.reactivateCategoryById(id);
    }

    @Put('/update')
    @ApiOperation({ summary: 'Update a category by ID' })
    @ApiResponse({ status: 200, description: 'Category successfully updated', type: Categories })
    @ApiResponse({ status: 404, description: 'Category not found' })
    public async updateCategoryById(@Body() updateCategoryDto: UpdateCategoryDto) : Promise<Categories> {
        return await this.categoriesService.updateCategoryById(updateCategoryDto);
    }
}
