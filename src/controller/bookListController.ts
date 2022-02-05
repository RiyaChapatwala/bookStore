import { BookList } from "../entity/BookList";
import { Request, Response } from "express";
import { TypesOfBooks } from "../entity/TypesOfBooks";
import { Author } from "../entity/Author";
import { getRepository } from "typeorm";
// import { Author } from "../entity/Author";

export const getList = async (_: Request, res: Response) => {
  try {
    const bookList = await BookList.find();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(200).json(error);
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { name, bookType, description, author } = req.body;
    // if (!id) {
    //   return res.status(500).json({ message: "booktype is not given " });
    // }
    console.log(author, "author");

    if (!bookType.trim().length || !name.trim().length) {
      return res.status(500).json({ message: "booktype is not given " });
    }

    let Type = await TypesOfBooks.findOne({ where: { bookType: bookType } });

    if (!Type) {
      Type = new TypesOfBooks();
      Type.bookType = bookType;
      await Type.save();
    }
    console.log(Type);

    const newBook = new BookList();
    newBook.type = Type!;
    newBook.name = name;
    newBook.discription = description;
    await newBook.save();

    let author1 = await Author.findOne({
      relations: ["bookList"],
      where: { name: author[0].name },
    });
    if (!author1) {
      author1 = new Author();
      author1.name = author[0].name;
      author1.description = author[0].description;
      author1.image = author[0].image;
    }
    console.log(author1.bookList, "author book");
    if (author1.bookList) author1.bookList = [...author1.bookList, newBook];
    else author1.bookList = [newBook];

    await author1.save();

    return res.json(newBook);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const bookById = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    const book = await BookList.findOne({ where: { id: bookId } });
    return res.json(book);
  } catch (err) {
    return res.json(err);
  }
};

export const bookByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const data = await getRepository(BookList)
      .createQueryBuilder("books")
      .leftJoin("books.authors", "authors")
      .where("authors.id = :authorId", { authorId })
      .getMany();
    return res.json(data);
  } catch (err) {
    return res.json(err);
  }
};
