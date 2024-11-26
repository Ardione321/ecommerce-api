import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteUserByIdProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    public async deleteUserById(id: number): Promise<{ deleted: boolean; id: number }> {
        let user = undefined;
        try {
            user = await this.usersRepository.softDelete(id);
            if(!user) throw new ConflictException('User not found');
        } catch (error) {
            throw new RequestTimeoutException(error);
        }
        return { deleted: true, id };
    }
}
