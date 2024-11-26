import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInProvider } from './providers/sign-in.provider';
import { SignInDto } from './dtos/signin-dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly signInProvider: SignInProvider,
        private readonly refreshTokensProvider: RefreshTokensProvider
    ) {}

    public async signIn(signInDto: SignInDto) {
        try {
            return await this.signInProvider.signIn(signInDto);
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    };

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }
}
