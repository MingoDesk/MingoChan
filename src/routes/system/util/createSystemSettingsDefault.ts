import { getDB } from "../../../database/db";
import { systemSettings } from "../controllers/systemsController";

export interface ICreateSystemsDefaultRes {
  success: boolean;
  errors: string | null;
  msg: string;
  data?: systemSettings;
}

// TODO: ADD the ID here as a parameter coming from the session

const createSystemSettingsDefault = async (data, updated: Date = new Date()): Promise<ICreateSystemsDefaultRes> => {
  const create = await getDB().settings.findOneAndUpdate(
    { _id: "1eff307b-c25c-4c43-83c0-1752b2ebd7c2" },
    { $set: { ...data, updated } },
    { upsert: true, returnOriginal: false }
  );

  if (!create || !create.value) {
    return {
      success: false,
      errors: "Internal server error",
      msg: "Something went wrong, please try again",
    };
  }

  return {
    success: true,
    errors: null,
    msg: "Success! Your settings have been updated.",
    data: { ...create.value },
  };
};

export { createSystemSettingsDefault };
