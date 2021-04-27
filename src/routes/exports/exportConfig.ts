import { Router } from "express";
import { exportFile } from "./controllers/exportController";
const router = Router();

router.get("/", exportFile);
//@ts-ignore

export default router;
