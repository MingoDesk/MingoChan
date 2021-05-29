import { getDB } from '../../../database/db';
import { find } from '@tadashi/mongo-cursor-pagination';
import { TicketStatus, ITicket } from './ticketController';
import { IPaginateResult } from '../../../@types/paginate';

const getUnassignedTickets = async (req, res) => {
	// Get all tickets that aren't assigned to anyone and that has an open status

	const tickets: IPaginateResult<ITicket> = await find(getDB().tickets, {
		limit: 50,
		query: { status: TicketStatus.open, $or: [{ assignee: { $type: 'null' } }, { assignee: { $exists: false } }] },
		next: req.query.hasNext == 'true' ? true : false,
	});

	if (!Array.isArray(tickets.results) || !tickets.results.length)
		return res.status(200).send({ sucess: false, error: 'No tickets found', msg: "There aren't any tickets 🥳" });

	const data = tickets.results.map(({ rating, messages, personnelView, notes, ...metaData }) => metaData);

	return res.status(200).send({
		success: true,
		errors: null,
		data,
	});
};

export { getUnassignedTickets };
