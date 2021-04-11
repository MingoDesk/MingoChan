import { Router } from "express";
import { createNote } from "./controllers/createNote";
import { validate } from "./controllers/noteController";

const router = Router();

//@ts-ignore
router.post("/new", validate("createNote"), createNote);

export default router;
