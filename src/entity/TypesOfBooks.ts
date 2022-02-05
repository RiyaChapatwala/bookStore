import { BookList } from "./BookList";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";

@Entity("TypesOfBooks")
export class TypesOfBooks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookType: string;

  @OneToMany(() => BookList, (bookList) => bookList.type)
  bookLists: BookList[];
}
