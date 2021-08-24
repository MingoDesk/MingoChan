import { getDB } from '@database/db';
import { validationResult, matchedData } from 'express-validator';
import { ObjectId } from 'mongodb';
import { populatePersonnelView } from '../util/populatePersonnelView';
import { ITicket, TicketStatus } from './ticketController';
import { v4 as uuid } from 'uuid';
import { responseGenerator } from '@util/responseGenerator';

const replyTicket = async (req, res): Promise<ITicket> => {
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	const _id = new ObjectId(data.ticketId);
	const now = new Date();
	const replyId = uuid();

	const updatedData = await getDB().tickets.findOneAndUpdate(
		{ _id },
		{
			$set: {
				status: TicketStatus.updated,
			},
			$push: {
				messages: {
					id: replyId,
					authorId: req.user.sub,
					author: req.user.name,
					text: data.text,
					createdAt: now,
				},
				personnelView: {
					id: replyId,
				},
			},
		},
		{
			returnOriginal: false,
		},
	);

	if (updatedData.ok !== 1 || !updatedData.value) {
		return res
			.status(500)
			.send({ ...responseGenerator(500, 'Failed to update ticket, please double check the parameters!') });
	}

	return res.status(200).send({
		success: true,
		errors: null,
		data: {
			...updatedData.value,
			personnelView: populatePersonnelView(
				updatedData.value.notes,
				updatedData.value.personnelView,
				updatedData.value.messages,
			),
		},
	});
};

export { replyTicket };
