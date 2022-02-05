import express from "express";
import {
  addBook,
  bookByAuthor,
  bookById,
  getList,
} from "../controller/bookListController";
const router = express.Router();

router.get("/", getList);
router.get("/:bookId", bookById);
router.get("/searchByAuthor/:authorId", bookByAuthor);

router.post("/addBook", addBook);

export { router as bookListRoutes };
