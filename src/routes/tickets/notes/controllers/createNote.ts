import { getDB } from "../../../../database/db";
import { validationResult } from "express-validator/check";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";

const createNote = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: "Bad request", errors: errors.array() });
  }

  const _id = new ObjectId(data.id);

  const updatedData = await getDB().tickets.findOneAndUpdate(
    { _id },
    {
      $push: {
        personnelView: {
          authorId: data.authorId,
          text: data.text,
          isNote: true,
        },
        notes: {
          authorId: data.authorId,
          text: data.text,
          isNote: true,
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

  return res.status(200).send({ success: true, errors: null, data: updatedData.value });
};

export { createNote };
