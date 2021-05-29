import { getDB } from '../../../database/db';
import { TicketStatus } from './ticketController';
import { find } from '@tadashi/mongo-cursor-pagination';
import { getMetadataFromTicket } from '../util/getMetadataFromTicket';

const getAssignedTickets = async (req, res) => {
	if (!req.query.userId) {
		return res.status(400).send({ success: false, error: 'Bad request', msg: 'You must provide a userId!' });
	}

	const tickets = await find(getDB().tickets, {
		limit: 50,
		query: { assignee: req.query.userId, status: TicketStatus.open },
		next: req.query.hasNext == 'true' ? true : false,
	});

	if (!Array.isArray(tickets.results) || !tickets.results.length) {
		return res.status(200).send({
			sucess: false,
			error: 'No tickets found',
			msg: "You don't have any tickets!",
		});
	}
	const data = getMetadataFromTicket(tickets);

	return res.status(200).send({
		success: true,
		errors: null,
		data,
	});
};

export { getAssignedTickets };
