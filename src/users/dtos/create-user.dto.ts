import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description: 'User\'s first name',
        minLength: 3,
        maxLength: 256,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(256)
    firstName: string;

    @ApiPropertyOptional({
        description: 'User\'s last name',
        minLength: 3,
        maxLength: 256,
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(256)
    lastName?: string;

    @ApiProperty({
        description: 'User\'s email address',
        maxLength: 256,
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(256)
    email: string;

    @ApiProperty({
        description: 'User\'s password with complexity requirements',
        minLength: 8,
        maxLength: 256,
        example: 'Password1!',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(256)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'Minimum eight characters, at least one letter, one number, and one special character.',
    })
    password: string;

    @ApiProperty({
        description: 'User\'s address',
        minLength: 3,
        maxLength: 1025,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(1025)
    address: string;
}
