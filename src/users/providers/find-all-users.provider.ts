import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindAllUsersProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async findAllUserProvider() : Promise<User[]> {
        let user : User[] = [];
        try {
            user = await this.usersRepository.find();
            if(!user) throw new ConflictException('No Users found in database');
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return user;
    }
}
