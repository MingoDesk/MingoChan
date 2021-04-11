import { Router } from "express";
import { createTicket } from "./controllers/createTicket";
import { getTicket } from "./controllers/getTicket";
import { updateTicket } from "./controllers/updateTicket";
import { validate } from "./controllers/ticketController";

const router = Router();

//@ts-ignore
router.post("/new", validate("createTicket"), createTicket);

//@ts-ignore
router.patch("/reply", validate("updateTicket"), updateTicket);

router.get("/:id", getTicket);

export default router;
