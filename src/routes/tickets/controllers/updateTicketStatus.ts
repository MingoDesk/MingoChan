import { getDB } from '@database/db';
import { responseGenerator } from '@util/responseGenerator';
import { Response, Request } from 'express';
import { matchedData, validationResult } from 'express-validator';

const updateTicketStatus = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	const newStatus = await getDB().tickets.findOneAndUpdate(
		{ _id: data.ticketId },
		{ $set: { status: data.ticketStatus } },
		{ returnOriginal: false },
	);

	if (newStatus.ok !== 1 || !newStatus.value) {
		return res
			.status(500)
			.send({ ...responseGenerator(500, 'Failed to update ticket, please double check the parameters!') });
	}
};

export { updateTicketStatus };
