import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @Column({ type: 'varchar', nullable: true })
  bio?: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
