import { validationResult } from "express-validator";
import { matchedData } from "express-validator";
import { Request, Response } from "express";
import { updateSystemSettings } from "../util/createSystemSettingsDefault";

// TODO: Attach the system's id on the users session by adding an identifier to the session

const updateSystemSettingsRoute = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: "Bad request", errors: errors.array() });
  }

  const updated = new Date();

  const updateSettings = await updateSystemSettings(data, updated);

  if (!updateSettings.success) return res.status(500).send(updateSettings);

  return res.status(200).send(updateSettings);
};

export { updateSystemSettingsRoute };
