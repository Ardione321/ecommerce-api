import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin-dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth') // Grouping this controller under 'auth' in Swagger
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    @ApiOperation({ summary: 'Sign in a user' }) // Description of what this endpoint does
    @ApiBody({ type: SignInDto }) // Specify the body type for the request
    @ApiResponse({ status: HttpStatus.OK, description: 'User signed in successfully.' }) // Response description
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials.' }) // Response for unauthorized access
    public async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }

    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.Bearer)
    @ApiOperation({ summary: 'Refresh user tokens' }) // Description of what this endpoint does
    @ApiBody({ type: RefreshTokenDto }) // Specify the body type for the request
    @ApiResponse({ status: HttpStatus.OK, description: 'Tokens refreshed successfully.' }) // Response description
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Refresh token invalid.' }) // Response for forbidden access
    public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.refreshTokens(refreshTokenDto);
    }
}
