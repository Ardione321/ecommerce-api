import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUsersProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly hashingProvider: HashingProvider,
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<User> {
        const existingUser : User = await this.usersRepository.findOneBy({ email: createUserDto.email });
        if (existingUser) {
            throw new BadRequestException('User already exists');
        }
        const hashedPassword = await this.hashingProvider.hashPassword(createUserDto.password);
        const newUser = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
        try {
            return await this.usersRepository.save(newUser);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
    }

}
