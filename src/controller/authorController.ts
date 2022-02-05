// import { BookList } from "./../entity/BookList";
import { Author } from "../entity/Author";
import { Request, Response } from "express";
import { BookList } from "../entity/BookList";
import { TypesOfBooks } from "../entity/TypesOfBooks";

export const addAuthor = async (req: Request, res: Response) => {
  try {
    const { name, description, image, book } = req.body;

    let Type = await TypesOfBooks.findOne({
      where: { bookType: book[0].type },
    });

    if (!Type) {
      Type = new TypesOfBooks();
      Type.bookType = book.type;
      await Type.save();
    }

    const book1 = new BookList();
    book1.name = book[0].name;
    book1.discription = book[0].discription;
    book1.type = Type;
    await book1.save();

    const newAuthor = new Author();
    newAuthor.name = name;
    newAuthor.description = description;
    newAuthor.image = image;
    newAuthor.bookList = [book1];
    await newAuthor.save();
    return res.status(200).json(newAuthor);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getAuthors = async (_: Request, res: Response) => {
  try {
    const authors = await Author.find();
    return res.status(200).json(authors);
  } catch (err) {
    return res.status(500).send(err);
  }
};
