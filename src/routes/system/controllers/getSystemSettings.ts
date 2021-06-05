import { getDB } from '../../../database/db';
import { Request, Response } from 'express';
import { updateSystemSettings as createSystemSettingsDefault } from '../util/createSystemSettingsDefault';
import { systemConfigdefaults } from '../../../config/config';
import { responseGenerator } from '../../../util/responseGenerator';

const getSystemSettings = async (req: Request, res: Response) => {
	const getSettings = await getDB().settings.findOne({});

	if (!getSettings) {
		const createDefaults = await createSystemSettingsDefault(systemConfigdefaults);

		if (!createDefaults)
			return res.status(500).send({
				...responseGenerator(500, 'Something went horribly wrong! Please try to reload the application.'),
			});

		return res.status(200).send({
			...responseGenerator(200, 'Success'),
			data: { ...createDefaults },
		});
	}

	return res.status(200).send({
		...responseGenerator(200, 'Sucess, the settings was updated!'),
		data: { ...getSettings },
	});
};

export { getSystemSettings };
