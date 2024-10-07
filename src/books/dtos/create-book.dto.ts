import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Author } from 'src/authors/author.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsOptional()
  publicationDate?: Date;

  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
