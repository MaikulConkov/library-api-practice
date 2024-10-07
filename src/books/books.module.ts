import { Module } from '@nestjs/common';
import { BooksService } from './providers/books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from 'src/authors/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
