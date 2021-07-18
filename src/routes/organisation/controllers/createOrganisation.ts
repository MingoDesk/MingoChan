import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { responseGenerator } from '@util/responseGenerator';
import { getDB } from '@database/db';

const createOrganisation = async (req: Request, res: Response) => {
	console.log("we're in");
	const errors = validationResult(req);
	const data = matchedData(req);

	console.log(data);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}
	const users = await getDB()
		.users.find({
			_id: { $in: data.users },
			organisationId: req.user!.organisationId,
		})
		.toArray();

	if (!users.length || users.length !== data.users.length) {
		return res.status(400).send({ ...responseGenerator(400, 'Invalid users') });
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
