import { Router } from "express";
import { createTicket } from "./controllers/createTicket";
import { getTicket } from "./controllers/getTicket";
import { replyTicket } from "./controllers/replyTicket";
import { validate } from "./controllers/ticketController";

import noteRouter from "./notes/noteConfig";

const router = Router();

//@ts-ignore
router.post("/new", validate("createTicket"), createTicket);
//@ts-ignore
router.patch("/reply", validate("replyTicket"), replyTicket);
router.get("/:id", getTicket);
router.use("/notes", noteRouter);

export default router;
