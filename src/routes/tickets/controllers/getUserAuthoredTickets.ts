import { getDB } from '@database/db';
import { find } from '@tadashi/mongo-cursor-pagination';
import { responseGenerator } from '@util/responseGenerator';
import { TicketStatus } from './ticketController';
import { getMetadataFromTicket } from '../util/getMetadataFromTicket';
import { validationResult, matchedData } from 'express-validator';
import { Request, Response } from 'express';

interface StatusBody {
  status: TicketStatus;
}

const getUserAuthoredTickets = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }
  if (!req.params.userId) {
    return res.status(400).send({ success: false, error: 'Bad request', msg: 'You must provide a userId!' });
  }

  const hasNext = Boolean(req.query.hasNext);
  const hasPrevious = Boolean(req.query.hasPrevious);
  const reqStatus = String(req.query.status);
  let statusBody: StatusBody[] = [];

  if (reqStatus.length && !Object.values(TicketStatus).includes(reqStatus)) {
    return res.status(400).send({
      ...responseGenerator(400,
        `Status was not valid. Valid statuses are: ${Object.values(TicketStatus).toString()}`)
    });
  } else if (reqStatus.length && Object.values(TicketStatus).includes(reqStatus)) {
    if (reqStatus === TicketStatus.open.toString() || reqStatus === TicketStatus.updated.toString()) {
      statusBody = [{
        status: TicketStatus.open
      },
      {
        status: TicketStatus.updated
      }];
    }
    statusBody = [{ status: parseInt(reqStatus, 10) }];
  }

  const tickets = await find(getDB().tickets, {
    limit: parseInt(process.env.PAGINATION_LIMIT, 10),
    query: {
      authorId: data.userId,
      $or: [...statusBody]
    },
    next: hasNext ? req.params.nextHash : null,
    previous: hasPrevious ? req.params.nextHash : null,
  });

  if (!Array.isArray(tickets.results) || !tickets.results.length) {
    return res.status(200).send({
      ...responseGenerator(200, "You don't have any tickets 🥳"),
    });
  }

  const metadata = getMetadataFromTicket(tickets.results);


  return res.status(200).send({
    ...responseGenerator(200, 'Here are your tickets!'),
    data: metadata,
    hasNext: tickets.hasNext,
    hasPrevious: tickets.hasPrevious,
  });
};

export { getUserAuthoredTickets };
