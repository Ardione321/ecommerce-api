import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { PatchUserDto } from './dtos/patch-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@ApiTags('users')  // Tagging the controller for Swagger UI
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
    public async findAllUsers(): Promise<User[]> {
        return await this.usersService.findAllUsers();
    }

    @Get('/email/:email?')
    @ApiOperation({ summary: 'Find user by email' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    public async findOneByEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.findOneByEmail(email);
    }

    @Get('/id/:id?')
    @ApiOperation({ summary: 'Find user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    public async findOneById(@Param('id') id: number): Promise<User> {
        return await this.usersService.findOneById(id);
    }

    @Post('register')
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Post('register-many')
    @ApiOperation({ summary: 'Register multiple users' })
    @ApiResponse({ status: 201, description: 'Users created successfully.' })
    public async createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto): Promise<User[]> {
        return await this.usersService.createManyUsers(createManyUsersDto);
    }

    @Put('update')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    public async updateUserById(@Body() patchUserDto: PatchUserDto): Promise<User> {
        return await this.usersService.updateUserById(patchUserDto);
    }

    @Delete('soft-delete')
    @ApiOperation({ summary: 'Soft delete a user by ID' })
    @ApiResponse({ status: 200, description: 'User soft deleted successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    public async deleteUserById(@Query('id', ParseIntPipe) id: number): Promise<{ deleted: boolean; id: number }> {
        return await this.usersService.deleteUserById(id);
    }

    @Put('/reactivate/:id')
    @ApiOperation({ summary: 'Reactivate a soft deleted user by ID' })
    @ApiResponse({ status: 200, description: 'User reactivated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    public async reactivateUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.usersService.reactivateUserById(id);
    }
}
