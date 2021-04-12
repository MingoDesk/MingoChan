import { Router } from "express";
import { createNote } from "./controllers/createNote";
import { editNote } from "./controllers/editNote";
import { validate } from "./controllers/noteController";

const router = Router();

//@ts-ignore
router.post("/new", validate("note"), createNote);

//@ts-ignore

router.patch("/edit", validate("editNote"), editNote);

export default router;
