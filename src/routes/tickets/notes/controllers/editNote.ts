import { getDB } from "../../../../database/db";
import { validationResult } from "express-validator";
import { matchedData } from "express-validator";
import { ObjectId } from "mongodb";
import { version as uuidVersion } from "uuid";
import { validate as uuidValidate } from "uuid";
import { populatePersonnelView } from "../../util/populatePersonnelView";

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

const editNote = async (req, res) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: "Bad request", errors: errors.array() });
  }

  if (!uuidValidateV4(data.noteId)) {
    return res.status(400).send({ error: "Bad request", msg: "Field id failed validation", success: false });
  }

  const _id = new ObjectId(data.id);
  const date = new Date();

  const updatedData = await getDB().tickets.findOneAndUpdate(
    { _id, "notes.id": data.noteId },
    {
      $set: {
        "notes.$.text": data.text,
      },
      $push: { "notes.$.history": { createdAt: date, text: data.text } },
    },
    {
      returnOriginal: false,
    }
  );

  console.log(updatedData);

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

export { editNote };
