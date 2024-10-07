import { Author } from 'src/authors/author.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  publicationDate?: Date;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;
}
