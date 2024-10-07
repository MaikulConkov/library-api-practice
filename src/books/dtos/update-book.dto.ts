import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
