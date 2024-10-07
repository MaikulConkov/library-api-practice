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

@Controller('authors')
export class AuthorsController {
  constructor(private) {}

  @Get()
  public getAuthors() {}

  @Get('/:id')
  public getSingleAuthor(@Param('id', ParseIntPipe) id: number) {}

  @Post()
  public createAuthor(@Body() createAuthorDto: CreateAuthorDto) {}

  @Patch('/:id')
  public updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {}
  @Delete('/:id')
  public deleteAuthor(@Param('id', ParseIntPipe) id: number) {}
}
