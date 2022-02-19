import { getDB } from '@database/db';
import { find } from '@tadashi/mongo-cursor-pagination';
import { responseGenerator } from '@util/responseGenerator';
import { getMetadataFromTicket } from '../util/getMetadataFromTicket';
import { validationResult, matchedData } from 'express-validator';
import { Request, Response } from 'express';

const getUserAuthoredTickets = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const hasNext = Boolean(req.query.hasNext);
  const hasPrevious = Boolean(req.query.hasPrevious);

  const tickets = await find(getDB().tickets, {
    limit: parseInt(process.env.PAGINATION_LIMIT, 10),
    query: {
      authorId: data.userId,
      status: data.status
    },
    next: hasNext ? req.params.nextHash : null,
    previous: hasPrevious ? req.params.nextHash : null,
  });

  if (!Array.isArray(tickets.results) || !tickets.results.length) {
    return res.status(200).send({
      ...responseGenerator(200, "You don't have any tickets 🥳"),
    });
  }

  return res.status(200).send({
    ...responseGenerator(200, 'Here are your tickets!'),
    data: getMetadataFromTicket(tickets.results),
    hasNext: tickets.hasNext,
    hasPrevious: tickets.hasPrevious,
  });
};

export { getUserAuthoredTickets };
