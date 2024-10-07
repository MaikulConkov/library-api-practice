import { Exclude, Expose } from 'class-transformer';

export class BookDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  publicationDate: Date;

  @Exclude()
  author: any;
}
