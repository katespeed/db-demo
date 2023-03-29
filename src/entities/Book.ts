import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  //   ManyToOne,
  ManyToMany,
  Relation,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Review } from './Review';
import { Author } from './Author';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  bookId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  publshidYear: number;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Relation<Review>[];

  @ManyToMany(() => Author, (author) => author.book)
  @JoinTable()
  author: Relation<Author>[];
}
