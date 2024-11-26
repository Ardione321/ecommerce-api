import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'The name of the category',
        minLength: 6,
        maxLength: 255, // Set a maximum length if desired
        example: 'Electronics',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: 'A description of the category',
        maxLength: 1025,
        example: 'This category includes all electronic devices and gadgets.',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1025)
    description: string;
}
