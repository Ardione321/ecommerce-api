import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import jwtConfig from "../config/jwt.config";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import { GenerateTokentProvider } from "./generate-tokens.provider";
import { UsersService } from "src/users/users.service";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
import { ActiveUserData } from "../interfaces/active-user-data.interface";

@Injectable()
export class RefreshTokensProvider {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly generateTokenProvider: GenerateTokentProvider,
    ) {}

    public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        try {
            const { sub } = await this.jwtService.verifyAsync<Pick <ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
                secret: this.jwtConfiguration.secret,
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer
            });
            const user = await this.usersService.findOneById(sub);
            return await this.generateTokenProvider.generateTokens(user);
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
