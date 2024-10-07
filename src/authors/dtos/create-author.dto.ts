import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Book } from 'src/books/book.entity';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsOptional()
  bio?: string;
}
