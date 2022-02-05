import { TypesOfBooks } from "./../entity/TypesOfBooks";
import { Request, Response } from "express";
import { BookList } from "./../entity/BookList";
// import express from "express";

// const router = express.Router();

export const getTypes = async (_: Request, res: any) => {
  try {
    const bookType = await TypesOfBooks.find();
    return res.status(200).json(bookType);
  } catch (error) {
    return res.status(200).json(error);
  }
};

export const addTypes = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const { id, bookType } = req.body;
    if (!id) {
      return res.status(500).json({ message: "booktype is not given " });
    }
    if (!bookType.trim().length) {
      return res.status(500).json({ message: "booktype is not given " });
    }
    const newType = new TypesOfBooks();
    newType.id = id;
    newType.bookType = bookType;
    await newType.save();
    return res.json(req.body);
  } catch (err) {
    return res.status(500).json({ message: "something wrong " });
  }
};

export const getById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json("type not existed");
    }
    const list = await BookList.find({
      relations: ["type"],
      where: { type: { id: id } },
    });
    console.log(list);
    // const queryBuilder = await getRepository(BookList)
    //   .createQueryBuilder("BookList")
    //   .leftJoinAndSelect("BookList.type", "type")
    //   .where("BookList.type = :id", { id });
    return res.json(list);
  } catch (err) {
    return res.json(err);
  }
};
