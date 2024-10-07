import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';
import { Author } from 'src/authors/author.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  public async getAllBooks() {
    const books = await this.booksRepository.find({
      relations: ['author'],
    });
    return books;
  }

  public async getSingleBook(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID: ${id} not found`);
    }

    return book;
  }

  public async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, description, publicationDate, authorId } = createBookDto;

    const author = await this.authorsRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID: ${authorId} not found`);
    }

    const book = this.booksRepository.create({
      title,
      description,
      publicationDate,
      author,
    });

    try {
      return await this.booksRepository.save(book);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later.',
        { description: 'Error saving the book in the database.' },
      );
    }
  }

  public async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    let book;

    try {
      book = await this.booksRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later.',
        { description: 'Error connecting to the database.' },
      );
    }

    if (!book) {
      throw new NotFoundException(
        `Book with ID: ${updateBookDto.id} not found`,
      );
    }

    book.title = updateBookDto.title ?? book.title;
    book.description = updateBookDto.description ?? book.description;
    book.publicationDate =
      updateBookDto.publicationDate ?? book.publicationDate;

    try {
      await this.booksRepository.save(book);
      return book;
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later.',
        { description: 'Error saving the book in the database.' },
      );
    }
  }

  public async deleteBook(id: number) {
    await this.booksRepository.delete(id);

    return { deleted: true, id };
  }
}
