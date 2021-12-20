import { getDB } from '@database/db';
import { ObjectId } from 'mongodb';
import { responseGenerator } from '@util/responseGenerator';
import { populatePersonnelView } from '../util/populatePersonnelView';

const getTicket = async (req, res) => {
  if (!req.params.id) return res.status(400).send({ ...responseGenerator(400, 'Bad ticket id') });

  const id = new ObjectId(req.params.id);
  const data = await getDB().tickets.findOne({ _id: id });

  if (!data) { return res.status(400).send({ ...responseGenerator(400, 'No ticket found with that id!') }); }

  return res.status(200).send({
    ...responseGenerator(200, 'Success'),
    data: {
      ...data,
      personnelView: populatePersonnelView(data.notes, data.personnelView, data.messages),
    },
  });
};

export { getTicket };
