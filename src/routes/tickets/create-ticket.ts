import { TicketStatus } from '@@types/ticket';
import { getDB } from '@database/db';
import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';

// TODO: Don't return all data if some permissions are absent

export const createTicket = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code),
      errors
    });
  }

  const createdAt = new Date();
  const messageId = uuid();

  const newTicket = await getDB().tickets.insertOne({
    authorId: req.user?.providerId,
    author: req.user?.name,
    subject: req.body.subject,
    status: TicketStatus.open,
    updated: true,
    createdAt,
    messages: [
      {
        body: req.body.body,
        authorId: req.user?.providerId,
        author: req.user?.name,
        createdAt,
        id: messageId
      }
    ],
    notes: [],
    staffView: [{ id: messageId }]
  });

  if (newTicket.acknowledged) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).send({
      ...responseGenerator(HTTP_STATUS.INTERNAL_SERVER_ERROR.code, 'Oops, something went wrong! Please try again.')
    });
  }

  return res.status(HTTP_STATUS.SUCCESS.code).send({
    ...responseGenerator(HTTP_STATUS.SUCCESS.code),
    data: newTicket
  });
};
