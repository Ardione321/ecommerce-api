import { ConflictException, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByEmailProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    public async findOneByEmailProvider(email: string) : Promise<User> {
        let user : User = undefined;
        try {
            user = await this.usersRepository.findOneBy({ email })
            if(!user) throw new ConflictException('User not found');
        } catch(error) {
            throw new RequestTimeoutException(error);
        }
        return user;
    }
}
