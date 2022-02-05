import { Author } from "./Author";
import { TypesOfBooks } from "./TypesOfBooks";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BookList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  name: string;

  @Column()
  discription: string;

  @ManyToOne(() => TypesOfBooks, (typeOfBooks) => typeOfBooks.bookLists)
  @JoinColumn({ name: "type-id" })
  type: TypesOfBooks;

  @ManyToMany(() => Author, (author) => author.bookList)
  authors: Author[];
}
