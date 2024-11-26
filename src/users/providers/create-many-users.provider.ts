import { Injectable, RequestTimeoutException, ConflictException } from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource, Repository, ManyToMany, QueryRunner } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateManyUsersProvider {
    constructor(
        private readonly dataSource: DataSource,
        private readonly hashingProvider: HashingProvider,
    ) {}

    public async createManyUsers(createManyUserDto: CreateManyUsersDto): Promise<User[]> {
        const usersToCreate = createManyUserDto.users;
        const queryRunner = this.dataSource.createQueryRunner();
        const createdUsers: User[] = [];
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            for (const user of usersToCreate) {
                const hashedPassword = user.password ? await this.hashingProvider.hashPassword(user.password) : undefined;
                const newUser = await this.createUser(queryRunner, { ...user, password: hashedPassword });
                createdUsers.push(newUser);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await this.handleTransactionError(queryRunner);
        } finally {
            await this.releaseQueryRunner(queryRunner);
        }
        return createdUsers;
    }

    private async createUser(queryRunner: QueryRunner, user: Partial<User>): Promise<User> {
        const { email } = user;
        const existingUser = await queryRunner.manager.findOneBy(User, { email: email });
        if(existingUser) {
            throw new ConflictException('User Already Exists');
        }
        try {
            const newUser = queryRunner.manager.create(User, user);
            return await queryRunner.manager.save(newUser);
        } catch (error) {
            throw new ConflictException('Failed to create user', error.message);
        }
    }

    private async handleTransactionError(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.rollbackTransaction();
        } catch (rollbackError) {
            throw new RequestTimeoutException(rollbackError.message || 'Rollback failed');
        }
    }

    private async releaseQueryRunner(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.release();
        } catch (releaseError) {
            throw new RequestTimeoutException(releaseError.message || 'Failed to release query runner');
        }
    }
}
