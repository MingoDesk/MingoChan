import { getDB } from '@database/db';
import { validationResult, matchedData } from 'express-validator';
import { ObjectId } from 'mongodb';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { populatePersonnelView } from '@tickets/util/populatePersonnelView';
import { responseGenerator } from '@util/responseGenerator';

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

const editNote = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  if (!uuidValidateV4(data.noteId)) {
    return res.status(400).send({ ...responseGenerator(400, 'The id you passed is not valid!') });
  }

  const _id = new ObjectId(data.ticketId);
  const now = new Date();

  const updatedData = await getDB().tickets.findOneAndUpdate(
    { _id, 'notes.id': data.noteId },
    {
      $set: {
        'notes.$.text': data.text,
      },
      $push: { 'notes.$.history': { createdAt: now, text: data.text } },
    },
    {
      returnOriginal: false,
    },
  );

  if (updatedData.ok !== 1 || !updatedData.value) {
    return res.status(500).send({ ...responseGenerator(500, 'Failed to update ticket, please try again!') });
  }

  return res.status(200).send({
    ...responseGenerator(200, 'Success!'),
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

export { editNote };
