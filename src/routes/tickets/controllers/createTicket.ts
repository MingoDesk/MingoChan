import { getDB } from '@database/db';
import { matchedData, validationResult } from 'express-validator';
import { v4 as uuid } from 'uuid';
import { responseGenerator } from '@util/responseGenerator';
import { TicketStatus } from './ticketController';
import { Request, Response } from 'express';

// TODO: Make sure to incorporate diffirent callbacks depending on user permissions

const createTicket = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const createdAt = new Date();
  const messageId = uuid();

  const newTicket = await getDB().tickets.insertOne({
    authorId: req.user!.providerId,
    author: req.user!.name,
    subject: data.subject,
    authorOrganisationId: req.user!.organisationId ?? null,
    status: TicketStatus.updated,
    createdAt,
    // TODO: Check if customer group is marked as "starred"
    isStarred: false,
    tags: [],
    labels: [],
    isUpdated: true,
    messages: [
      {
        body: data.body,
        subject: data.subject,
        author: req.user!.name,
        authorId: req.user!._id,
        createdAt,
        id: messageId,
      },
    ],
    notes: [],
    personnelView: [{ id: messageId }],
  });

  if (!newTicket.ops.length) {
    return res.status(500).send({
      ...responseGenerator(500, 'Something went wrong when saving to DB, please try again'),
    });
  }

  return res.status(200).send({
    ...responseGenerator(200, 'Sucess, your ticket was sent!'),
    data: { ...newTicket.ops[0] },
  });
};

export { createTicket };
