import { getDB } from '@database/db';
import { Response } from 'express';
import { systemConfigdefaults } from '@config/config';
import { responseGenerator } from '@util/responseGenerator';
import { updateSystemSettings } from '../util/updateSystemSettings';

const getSystemSettings = async ({ res }: { res: Response }) => {
  const settings = await getDB().settings.findOne({});

  if (!settings) {
    const createDefaults = await updateSystemSettings(systemConfigdefaults);

    if (!createDefaults) {
      return res.status(500).send({
        ...responseGenerator(500, 'Something went horribly wrong! Please try to reload the application.'),
      });
    }

    return res.status(200).send({
      ...responseGenerator(200, 'Success'),
      data: { ...createDefaults },
    });
  }

  return res.status(200).send({
    ...responseGenerator(200, 'Sucess, the settings was updated!'),
    data: { ...settings },
  });
};

export { getSystemSettings };
