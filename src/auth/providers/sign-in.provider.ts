import { SignInDto } from './../dtos/signin-dto';
import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";
import { HashingProvider } from "./hashing.provider";
import { GenerateTokentProvider } from "./generate-tokens.provider";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SignInProvider {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly hashingProvider: HashingProvider,
        private readonly generateTokenProvider: GenerateTokentProvider
    ) {}

    public async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        try {
            const user = await this.usersService.findOneByEmail(signInDto.email);
            if(!user) {
                throw new UnauthorizedException('User not found');
            }
            const passwordMatches = await this.verifyPassword(signInDto.password, user.password);
            if(!passwordMatches) {
                throw new UnauthorizedException('Password does not match'); 
            }
            return await this.generateTokenProvider.generateTokens(user);
        } catch(error) {
            throw new RequestTimeoutException(error);
        }
    }

    public async verifyPassword(password: string, hash: string): Promise<boolean> {
        try {
            return await this.hashingProvider.comparePassword(password, hash);
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Password comparison failed',
            });
        }
        
    }
}
