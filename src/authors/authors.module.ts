import { Module } from '@nestjs/common';
import { AuthorsService } from './providers/authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
