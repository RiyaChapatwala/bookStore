import { BookList } from "./BookList";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Author")
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToMany(() => BookList, (bookList) => bookList.authors)
  @JoinTable()
  bookList: BookList[];
}
