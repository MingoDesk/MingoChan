import { getDB } from "../../../database/db";
import { Request, Response } from "express";
import { updateSystemSettings as createSystemSettingsDefault } from "../util/createSystemSettingsDefault";
import { systemConfigdefaults } from "../../../config/config";

const getSystemSettings = async (req: Request, res: Response) => {
  const getSettings = await getDB().settings.findOne({});

  if (!getSettings) {
    const createDefaults = await createSystemSettingsDefault(systemConfigdefaults);

    if (!createDefaults.success) return res.status(500).send(createDefaults);

    return res.status(200).send(createDefaults);
  }

  return res.status(200).send({
    success: true,
    errors: null,
    data: { ...getSettings },
  });
};

export { getSystemSettings };
