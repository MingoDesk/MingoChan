import { getDB } from '@database/db';
import { responseGenerator } from '@util/responseGenerator';
import { Response } from 'express';
import { parseJsonToCsv } from '../util/jsonToCsvParser';

const exportTicket = async ({ res }: { res: Response }) => {
	const preferences = await getDB().settings.findOne({});
	if (!preferences.value || !preferences) {
		return res.status(500).send({
			...responseGenerator(500, 'Something went horribly wrong, please reload the application and try again!'),
		});
	}
	const data = await getDB().tickets.findOne({});

	if (!data.value || !data) {
		return res.status(400).send({
			...responseGenerator(400, 'No ticket was found'),
		});
	}
	if (preferences.prefDataType === 'CSV') {
		return parseJsonToCsv(res, 'tickets.csv', {}, data);
	}

	const date = new Date();

	res.header('Content-Type', 'text/json');
	res.attachment(date.toString());
	return res.status(200).send(data);
};

export { exportTicket };
