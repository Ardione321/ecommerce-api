import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { FastifyRequest } from 'fastify';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { ConfigType } from '@nestjs/config';


/**
 * This guard verifies the presence of a valid Bearer token in the request headers.
 * It validates the token using the configured JWT secret and then extracts the user data
 * from the token payload. If the token is invalid, it throws an UnauthorizedException.
 */
@Injectable()
export class AccessTokenGuard implements CanActivate {

    /**
     * Construct an instance of the access token guard.
     *
     * @param jwtService - The JWT service for verifying the token.
     * @param jwtConfiguration - The configuration for the JWT service.
     */
    constructor(
      private readonly jwtService: JwtService,
      @Inject(jwtConfig.KEY)
      private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    ) {}

    /**
     * Verifies the presence of a valid Bearer token in the request headers.
     *
     * @param context - The execution context.
     * @returns A boolean indicating if the request is authorized.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<FastifyRequest>();

      // Get the token from the request headers.
      const token = this.extractTokenFromHeader(request);

      // If the token is not present, throw an UnauthorizedException.
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      try {
        // Verify the token using the configured JWT secret.
        const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);
        // Set the user data in the request object.
        request[REQUEST_USER_KEY] = payload;
      } catch (error) {
        // If the token is invalid, throw an UnauthorizedException.
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    }

    /**
     * Extract the Bearer token from the request headers.
     *
     * @param request - The request object.
     * @returns The extracted token or undefined if the token is not present.
     */
    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) return undefined;

      // Split the authorization header into the scheme and token.
      const [, token] = authHeader.split(' ');
      return token;
    }
}
