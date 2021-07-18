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

	const updateData = await getDB().organisations.findOneAndUpdate(
		{ _id: data.organisationId },
		{},
		{ returnOriginal: false },
	);
};

export { updateOrganisation };
