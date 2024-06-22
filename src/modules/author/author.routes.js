import { Router } from "express";
const router = Router();
import * as BC from "./author.controller.js";

router.get("/pagination", BC.pagination);
router.get("/getAuthors", BC.getAuthors);
router.post("/createAuthor", BC.createAuthor);
router.get("/:id", BC.getAuthorByID);
router.delete("/:id", BC.deleteAuthor);
router.patch("/:id", BC.updateAuthor);

export default router;
