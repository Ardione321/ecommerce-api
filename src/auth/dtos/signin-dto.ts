import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for user sign-in.
 * This class defines the structure of the sign-in data and includes validation rules.
 */
export class SignInDto {
    /** 
     * The user's email address.
     * It must be a valid email format and cannot be empty.
     */
    @ApiProperty({
        description: 'The user\'s email address. Must be a valid email format.',
        example: 'user@example.com', // Example email for documentation
    })
    @IsEmail({}, { message: 'Invalid email format' }) // Custom error message for better clarity
    @IsNotEmpty({ message: 'Email cannot be empty' }) // Custom error message for clarity
    email: string;
    
    /** 
     * The user's password.
     * It must be a string and cannot be empty.
     */
    @ApiProperty({
        description: 'The user\'s password. Must be a string and cannot be empty.',
        example: 'P@ssw0rd!', // Example password for documentation
    })
    @IsString({ message: 'Password must be a string' }) // Custom error message for better clarity
    @IsNotEmpty({ message: 'Password cannot be empty' }) // Custom error message for clarity
    password: string;
}
