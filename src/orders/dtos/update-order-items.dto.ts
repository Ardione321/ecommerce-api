import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderItemDto } from './update-order-item-dto';

export class UpdateOrderItemsDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateOrderItemDto)
    items: UpdateOrderItemDto[];
}
