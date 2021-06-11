import { Request, Response } from 'express';
import { responseGenerator } from '@util/responseGenerator';
import { matchedData, validationResult } from 'express-validator';
import { getDB } from '@database/db';
import { ObjectId } from 'mongodb';

const assignTicket = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	if (data.assignTo) {
		const userExist = await getDB().users.findOne({ _id: data.assignTo });
		if (!userExist) return res.status(400).send({ ...responseGenerator(400, 'There is no such user!') });
	}

	const _id = new ObjectId(data.ticketId);

	const updateAssignee = await getDB().tickets.findOneAndUpdate(
		{ _id: _id },
		{ $set: { assignee: data.assignTo } },
		{
			returnOriginal: false,
		},
	);

	if (updateAssignee.ok !== 1 || !updateAssignee.value) {
		return res.status(500).send({
			...responseGenerator(500, 'Failed to update assignee, please try again'),
		});
	}

	return res.status(200).send({
		...responseGenerator(200),
		assignee: data.assignTo,
	});
};

export { assignTicket };
