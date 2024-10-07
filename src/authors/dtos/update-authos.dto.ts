import { PartialType } from '@nestjs/swagger';
import { CreateAuthorDto } from './create-author.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
