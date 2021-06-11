import { getDB } from '@database/db';
import { validationResult, matchedData } from 'express-validator';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

const leaveTicketSatisfaction = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	const _id = new ObjectId(data.ticketId);
	const now = new Date();

	const updatedData = await getDB().tickets.findOneAndUpdate(
		{ _id },
		{ $set: { satisfaction: data.satisfactionLevel, satisfactionLeftAt: now } },
		{ returnOriginal: false },
	);

	if (updatedData.ok !== 1 || !updatedData.value) {
		return res
			.status(500)
			.send({ ...responseGenerator(500, 'Failed to update ticket, please double check the parameters!') });
	}

	return res.status(200).send({ ...responseGenerator(200), satisfactionLevel: updatedData.value.satisfaction });
};

export { leaveTicketSatisfaction };
