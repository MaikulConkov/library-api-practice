import { Expose, Type } from 'class-transformer';
import { BookDto } from 'src/books/dtos/book.dto';

export class AuthorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  birthdate: Date;

  @Expose()
  bio: string;

  @Expose()
  @Type(() => BookDto)
  books: BookDto[];
}
