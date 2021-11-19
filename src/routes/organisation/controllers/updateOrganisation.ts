import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { responseGenerator } from '@util/responseGenerator';
import { getDB } from '@database/db';

const updateOrganisation = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	const users = await getDB()
		.users.find({
			_id: { $in: data.users },
			systemOrganisationId: req.user!.systemOrganisationId,
		})
		.toArray();

	if (!users.length || users.length !== data.users.length) {
		return res.status(400).send({ ...responseGenerator(400, 'Invalid users') });
	}

	const updateData = await getDB().organisations.findOneAndUpdate(
		{ _id: data.organisationId },
		{
			$set: { users: data.users },
		},
		{ returnOriginal: false },
	);

	if (updateData.ok !== 1 || !updateData.value) {
		return res.status(500).send({ ...responseGenerator(500, 'Failed to update organisation, please try again!') });
	}

	return res.status(200).send({ ...responseGenerator(200), data: { ...updateData.value } });
};

export { updateOrganisation };
