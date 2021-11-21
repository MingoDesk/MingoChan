import { getDB } from '@database/db';
import { find } from '@tadashi/mongo-cursor-pagination';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { TicketStatus, ITicket } from './ticketController';
import { IPaginateResult } from '../../../@types/paginate';
import { getMetadataFromTicket } from '../util/getMetadataFromTicket';

/**
 *
 * @param req.query.hasNext (boolean)
 * @param req.query.nextHash (string)
 * @param req.query.hasPrevious (boolean)
 * @param req.query.previousHash (boolean)
 * @returns Metadata from paginated tickets. If it includes "hasNext":true, then you're expected to make a second GET request witht he parameter ?hasNext=true to get the rest of the metadata
 */

const getUnassignedTickets = async (req: Request, res: Response) => {
  // Get all tickets that aren't assigned to anyone and that has an open status
  const hasNext = Boolean(req.query.hasNext);
  const hasPrevious = Boolean(req.query.hasPrevious);

  const tickets: IPaginateResult<ITicket> = await find(getDB().tickets, {
    limit: parseInt(process.env.PAGINATION_LIMIT, 10),
    query: {
      status: TicketStatus.updated,
      $or: [
        {
          assignee: { $type: 'null' },
        },
        {
          assignee: { $exists: false },
        },
      ],
    },
    next: hasNext ? req.params.nextHash : null,
    previous: hasPrevious ? req.params.previousHash : null,
  });

  if (!Array.isArray(tickets.results) || !tickets.results.length) {
    return res.status(200).send({
      data: [],
      ...responseGenerator(200, "There aren't any unassigned tickets 🥳"),
    });
  }

  const data = getMetadataFromTicket(tickets.results);

  return res.status(200).send({
    ...responseGenerator(200, "Here's todays tickets!"),
    data,
    hasNext: tickets.hasNext,
    hasPrevious: tickets.hasPrevious,
    nextHash: tickets.next,
    previousHash: tickets.previous,
  });
};

export { getUnassignedTickets };
