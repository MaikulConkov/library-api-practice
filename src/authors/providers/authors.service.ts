import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../author.entity';
import { Auth, Repository } from 'typeorm';
import { CreateAuthorDto } from '../dtos/create-author.dto';
import { UpdateAuthorDto } from '../dtos/update-authos.dto';
import { Book } from 'src/books/book.entity';
import { plainToInstance } from 'class-transformer';
import { AuthorDto } from '../dtos/author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  public async getAllAuthors(): Promise<Author[]> {
    const authors = await this.authorsRepository.find({ relations: ['books'] });
    return plainToInstance(AuthorDto, authors);
  }

  public async getSingleAuthor(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID: ${id} not found`);
    }
    return plainToInstance(AuthorDto, author);
  }

  public async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorsRepository.create(createAuthorDto);
    return await this.authorsRepository.save(newAuthor);
  }

  public async updateAuthor(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorsRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException(`Author with ID: ${id} not found`);
    }

    author.name = updateAuthorDto.name ?? author.name;
    author.birthdate = updateAuthorDto.birthdate ?? author.birthdate;
    author.bio = updateAuthorDto.bio ?? author.bio;

    return await this.authorsRepository.save(author);
  }

  public async deleteAuthor(id: number) {
    await this.authorsRepository.delete(id);

    return { deleted: true, id };
  }
}
