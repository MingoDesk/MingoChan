import { matchedData, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { responseGenerator } from '@util/responseGenerator';
import { updateSystemSettings } from '../util/updateSystemSettings';

const updateSystemSettingsRoute = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  if (Object.entries(data).length === 0) {
    return res.status(400).send({ ...responseGenerator(400, 'You must pass at least one item to update') });
  }

  const updated = new Date();

  const updateSettings = await updateSystemSettings(data, updated);

  if (!updateSettings) {
    return res.status(500).send({
      ...responseGenerator(500, 'Something went horribly wrong! Please try again.'),
      data: updateSettings,
    });
  }

  return res.status(200).send(updateSettings);
};

export { updateSystemSettingsRoute };
