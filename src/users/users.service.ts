import { ReactivateUserByIdProvider } from './providers/reactivate-user-by-id.provider';
import { DeleteUserByIdProvider } from './providers/delete-user-by-id.provider';
import { FindAllUsersProvider } from './providers/find-all-users.provider';
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { User } from './user.entity';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { CreateUsersProvider } from './providers/create-users.provider';
import { UpdateUserByIdProvider } from './providers/update-user-by-id.provider';
import { PatchUserDto } from './dtos/patch-user.dto';
import { CreateManyUsersProvider } from './providers/create-many-users.provider';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly findOneByEmailProvider: FindOneByEmailProvider,
        private readonly findOneByIdProvider: FindOneByIdProvider,
        private readonly createUsersProvider: CreateUsersProvider,
        private readonly findAllUsersProvider: FindAllUsersProvider,
        private readonly deleteUserByIdProvider: DeleteUserByIdProvider,
        private readonly reactivateUserByIdProvider: ReactivateUserByIdProvider,
        private readonly updateUserByIdProvider: UpdateUserByIdProvider,
        private readonly createManyUsersProvider: CreateManyUsersProvider,
    ) {}

    public async findAllUsers() : Promise<User[]> {
        return await this.findAllUsersProvider.findAllUserProvider();
    }
    public async findOneByEmail(email: string) : Promise<User> {
        return await this.findOneByEmailProvider.findOneByEmailProvider(email);
    }

    public async findOneById(id: number) : Promise<User> {
        return await this.findOneByIdProvider.findUserByIdProvider(Number(id));
    }
    
    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.createUsersProvider.createUser(createUserDto);
    }

    public async createManyUsers(createManyUsersDto: CreateManyUsersDto) : Promise<User[]> {
        return await this.createManyUsersProvider.createManyUsers(createManyUsersDto);
    }

    public async updateUserById(patchUserDto: PatchUserDto) : Promise<User> {
        return await this.updateUserByIdProvider.updateUserById(patchUserDto)
    }

    public async deleteUserById(id: number): Promise<{ deleted: boolean; id: number }> {
        return await this.deleteUserByIdProvider.deleteUserById(Number(id));
    }

    public async reactivateUserById(id: number): Promise<User> {
        return await this.reactivateUserByIdProvider.reactivateUserByIdProvider(Number(id));
    }
}
