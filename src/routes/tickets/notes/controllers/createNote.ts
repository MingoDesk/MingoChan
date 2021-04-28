import { getDB } from "../../../../database/db";
import { validationResult } from "express-validator";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";
import { populatePersonnelView } from "../../util/populatePersonnelView";

const createNote = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: "Bad request", errors: errors.array() });
  }

  const _id = new ObjectId(data.id);
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
          authorId: data.authorId,
          text: data.text,
          isNote: true,
          history: [{ text: data.text, createdAt: date }],
        },
      },
    },
    {
      returnOriginal: false,
    }
  );

  if (updatedData.ok !== 1 || !updatedData.value) {
    return res.status(400).send({ errors: "Bad request", success: false, msg: "Failed to update ticket" });
  }

  return res.status(200).send({
    success: true,
    errors: null,
    data: {
      ...updatedData.value,
      personnelView: populatePersonnelView(
        updatedData.value.notes,
        updatedData.value.personnelView,
        updatedData.value.messages
      ),
    },
  });
};

export { createNote };
