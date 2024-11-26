import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReactivateUserByIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    public async reactivateUserByIdProvider(id: number): Promise<User> {
        let user : User = undefined;
        try {
            user = await this.usersRepository.findOne({ where: { id }, withDeleted: true });
            if(!user || !user.deletedAt) throw new ConflictException('User not found');
    
            user.deletedAt = null;
            await this.usersRepository.save(user);
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
       
        return user;
    }
}
