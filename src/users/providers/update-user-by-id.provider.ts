import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { PatchUserDto } from './../dtos/patch-user.dto';
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class UpdateUserByIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly hashingProvider: HashingProvider
    ) {}

    public async updateUserById(patchUserDto: PatchUserDto): Promise<User> {
        try {
            const hashedPassword : string = patchUserDto.password ? await this.hashingProvider.hashPassword(patchUserDto.password) : undefined;
            const userToUpdate = await this.usersRepository.preload({
                id: patchUserDto.id,
                ...patchUserDto,
                password: hashedPassword,
            });
            if (!userToUpdate) {
                throw new ConflictException('User not found');
            }
            await this.usersRepository.save(userToUpdate);
            return userToUpdate;
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
    }
}
