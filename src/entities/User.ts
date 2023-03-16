import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Review } from './Review';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column({ default: 0 })
  profileViews: number;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Relation<Review>[];
}
