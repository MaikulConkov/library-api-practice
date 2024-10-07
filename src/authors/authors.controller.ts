import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { AuthorsService } from './providers/authors.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-authos.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  public getAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Get('/:id')
  public getSingleAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.getSingleAuthor(id);
  }

  @Post()
  public createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Patch('/:id')
  public updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  @Delete('/:id')
  public deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.deleteAuthor(id);
  }
}
