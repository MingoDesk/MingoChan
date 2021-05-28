import { getDB } from '../../../database/db';
import { find } from 'mongo-cursor-pagination';
import { TicketStatus, ITicket } from './ticketController';
import { IPaginateResult } from '../../../@types/paginate';

const getUnassignedTickets = async (req, res) => {
  console.log(req.query.hasNext == 'true' ? true : false);
  const tickets: IPaginateResult<ITicket> = await find(getDB().tickets, 'assignee', {
    limit: 50,
    fields: { _id: 1, assignee: 'github|16852656', status: TicketStatus.open },
    next: req.query.hasNext == 'true' ? true : false,
  });

  if (!Array.isArray(tickets.results) || !tickets.results.length)
    return res.status(200).send({ sucess: false, error: 'No tickets found', msg: "There aren't any tickets 🥳" });

  //console.log(data);
  const data = tickets.results.map(({ rating, messages, personnelView, notes, ...metaData }) => metaData);

  console.log(data);

  return res.status(200).send({
    success: true,
    errors: null,
    data,
  });
};

export { getUnassignedTickets };
