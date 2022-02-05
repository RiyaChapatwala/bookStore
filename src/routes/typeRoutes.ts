import { addTypes, getById, getTypes } from "./../controller/typeController";
import express from "express";
const router = express.Router();

router.get("/", getTypes);
router.get("/:id", getById);

router.post("/addType", addTypes);
export { router as typeRoutes };
