import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";
import { ActiveUserData } from "../interfaces/active-user-data.interface";
@Injectable()
export class GenerateTokentProvider {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    public async signToken<T>(userId: number, expiresIn: number, payload?: T) : Promise<string> {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload
            },
            {
                audience: this.jwtConfiguration.audience,
                issuer: this.jwtConfiguration.issuer,
                secret: this.jwtConfiguration.secret,
                expiresIn
            }
        );
    }

    public async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
        const accessToken = await this.signToken<Partial<ActiveUserData>>(
            user.id,
            this.jwtConfiguration.accessTokenTtl,
            { email: user.email },
        );
        const refreshToken = await this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl);
        return { accessToken, refreshToken };
    }
}
