    import { Router } from "express";
    const router = Router();
    import * as BC from "./book.controller.js";

    router.get("/pagination", BC.pagination);
    router.get("/getBook", BC.getBook);
    router.post("/createBook", BC.createBook);
    router.get("/:id", BC.getBookByID);
    router.delete("/:id", BC.DeleteBook);
    router.patch("/:id", BC.updateBook);

    export default router;
