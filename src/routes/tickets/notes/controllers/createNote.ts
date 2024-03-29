import { getDB } from '@database/db';
import { validationResult, matchedData } from 'express-validator';
import { ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';
import { populatePersonnelView } from '@tickets/util/populatePersonnelView';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';

const createNote = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const _id = new ObjectId(data.ticketId);
  const noteId = uuid();
  const date = new Date();
  const updatedData = await getDB().tickets.findOneAndUpdate(
    { _id },
    {
      $push: {
        personnelView: {
          id: noteId,
          isNote: true,
        },
        notes: {
          id: noteId,
          authorId: req.user!.providerId,
          author: req.user!.name,
          body: data.body,
          isNote: true,
          history: [{
            bodyType: data.type,
            bodyContent: data.content,
            subjectType: data.type,
            subjectContent: data.content, createdAt: date
          }],
        },
      },
    },
    {
      returnOriginal: false,
    },
  );

  if (updatedData.ok !== 1 || !updatedData.value) {
    return res.status(500).send({ ...responseGenerator(500, 'Failed to update ticket, please try again!') });
  }

  return res.status(200).send({
    ...responseGenerator(200, 'Sucess!'),
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

export { createNote };
