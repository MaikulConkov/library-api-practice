import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './providers/books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  public getALlBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  public getSingleBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getSingleBook(id);
  }

  @Post()
  public createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Post('/bulk')
  public async createMultipleBooks(@Body() createBookDtos: CreateBookDto[]) {
    return this.booksService.createMultipleBooks(createBookDtos);
  }

  @Patch('/:id')
  public updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('/:id')
  public deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBook(id);
  }
}
