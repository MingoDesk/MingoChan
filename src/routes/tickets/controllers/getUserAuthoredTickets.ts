import { getDB } from '../../../database/db';
import { TicketStatus } from './ticketController';
import { find } from '@tadashi/mongo-cursor-pagination';
import { getMetadataFromTicket } from '../util/getMetadataFromTicket';
import { responseGenerator } from '../../../util/responseGenerator';

const getUserAuthoredTickets = async (req, res) => {
	if (!req.query.userId) {
		return res.status(400).send({ success: false, error: 'Bad request', msg: 'You must provide a userId!' });
	}

	// Get all tickets that aren't assigned to anyone and that has an open status
	const hasNext = Boolean(req.query.hasNext);
	const hasPrevious = Boolean(req.query.hasPrevious);

	const tickets = await find(getDB().tickets, {
		limit: parseInt(process.env.PAGINATION_LIMIT, 10),
		query: { authorId: req.query.userId, status: TicketStatus.open },
		next: hasNext ? req.params.nextHash : null,
		previous: hasPrevious ? req.params.nextHash : null,
	});

	if (!Array.isArray(tickets.results) || !tickets.results.length) {
		return res.status(200).send({
			...responseGenerator(200, "You don't have any tickets 🥳"),
		});
	}

	const data = getMetadataFromTicket(tickets);

	return res.status(200).send({
		...responseGenerator(200, 'Here are your tickets!'),
		data,
		hasNext: tickets.hasNext,
		hasPrevious: tickets.hasPrevious,
	});
};

export { getUserAuthoredTickets };
