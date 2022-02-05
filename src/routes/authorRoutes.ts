import express from "express";
import { addAuthor, getAuthors } from "../controller/authorController";

const router = express.Router();

router.get("/", getAuthors);
router.post("/addAuthor", addAuthor);

export { router as authorRouter };
