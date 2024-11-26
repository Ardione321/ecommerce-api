import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PatchUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: "Unique identifier for the user",
        example: 1,  // Example ID for illustration
    })
    @IsInt({ message: 'User ID must be an integer.' })  
    @IsNotEmpty({ message: 'User ID cannot be empty.' })
    id: number;
}
