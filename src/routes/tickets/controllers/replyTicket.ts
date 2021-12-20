import { getDB } from '@database/db';
import { validationResult, matchedData } from 'express-validator';
import { ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';
import { responseGenerator } from '@util/responseGenerator';
import { populatePersonnelView } from '../util/populatePersonnelView';
import { TicketStatus } from './ticketController';
import { Request, Response } from 'express';

const replyTicket = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const _id = new ObjectId(data.ticketId);
  const now = new Date();
  const replyId = uuid();

  const updatedData = await getDB().tickets.findOneAndUpdate(
    { _id },
    {
      $set: {
        status: TicketStatus.updated,
      },
      $push: {
        messages: {
          id: replyId,
          authorId: req.user!.providerId,
          author: req.user!.name,
          body: data.body,
          createdAt: now,
        },
        personnelView: {
          id: replyId,
        },
      },
    },
    {
      returnOriginal: false,
    },
  );

  if (updatedData.ok !== 1 || !updatedData.value) {
    return res
      .status(500)
      .send({ ...responseGenerator(500, 'Failed to update ticket, please double check the parameters!') });
  }

  return res.status(200).send({
    success: true,
    errors: null,
    data: {
      ...updatedData.value,
      personnelView: populatePersonnelView(
        updatedData.value.notes,
        updatedData.value.personnelView,
        updatedData.value.messages,
      ),
    },
  });
};

export { replyTicket };
