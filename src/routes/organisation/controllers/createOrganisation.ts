import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { responseGenerator } from '@util/responseGenerator';
import { getDB } from '@database/db';

const createOrganisation = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}


	const newOrganisation = await getDB().organisations.insertOne({
		name: data.name,
		users: data.users,
	});

	if (!newOrganisation.ops.length) {
		return res.status(500).send({
			...responseGenerator(500, 'Something went wrong when saving to DB, please try again'),
		});
	}

	return res.status(200).send({
		...responseGenerator(200),
		data: { ...newOrganisation.ops[0] },
	});
};

export { createOrganisation };
