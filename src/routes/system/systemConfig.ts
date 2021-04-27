import { Router } from "express";
import { updateSystemSettingsRoute } from "./controllers/updateSystemSettings";
import { getSystemSettings } from "./controllers/getSystemSettings";
import { validate } from "./controllers/systemsController";

const router = Router();

router.get("/", getSystemSettings);
//@ts-ignore
router.patch("/update", validate("update"), updateSystemSettingsRoute);

export default router;
