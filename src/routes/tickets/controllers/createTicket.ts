import { getDB } from '@database/db';
import { matchedData, validationResult } from 'express-validator';
import { ITicket, TicketStatus } from './ticketController';
import { v4 as uuid } from 'uuid';
import { responseGenerator } from '@util/responseGenerator';

// TODO: Make sure to incorporate diffirent callbacks depending on user permissions

const createTicket = async (req, res): Promise<ITicket> => {
	console.log('haro!');
	const errors = validationResult(req);
	const data = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
	}

	const createdAt = new Date();
	const ticketId = uuid();

	const newTicket = await getDB().tickets.insertOne({
		authorId: req.user._id,
		author: req.user.name,
		subject: data.subject,
		authorOrganisationId: req.user!.organisationId || null,
		status: TicketStatus.updated,
		createdAt: createdAt,
		// TODO: Check if customer group is marked as "starred"
		isStarred: false,
		tags: [],
		labels: [],
		isUpdated: true,
		messages: [
			{
				text: data.text,
				author: req.user.name,
				authorId: req.user._id,
				createdAt,
				id: ticketId,
			},
		],
		notes: [],
		personnelView: [{ id: ticketId }],
	});

	if (!newTicket.ops.length) {
		return res.status(500).send({
			...responseGenerator(500, 'Something went wrong when saving to DB, please try again'),
		});
	}

	console.log('You made it!');

	return res.status(200).send({
		...responseGenerator(200, 'Sucess, your ticket was sent!'),
		data: { ...newTicket.ops[0] },
	});
};

export { createTicket };
