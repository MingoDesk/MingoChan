import { getDB } from "../../../database/db";
import { ObjectId } from "mongodb";
import { populateNotes } from "../util/populatePersonnelView";

const getTicket = async (req, res) => {
  if (!req.params.id)
    return res
      .status(400)
      .send({ sucess: false, error: "Bad request ID", msg: "Either no id was passed or the id was invalid" });

  const id = new ObjectId(req.params.id);

  const data = await getDB().tickets.findOne({ _id: id });

  if (!data)
    return res
      .status(400)
      .send({ sucess: false, error: "Bad request ID", msg: "Either no id was passed or the id was invalid" });

  return res
    .status(200)
    .send({
      success: true,
      errors: null,
      data: { ...data, personnelView: populateNotes(data.notes, data.personnelView) },
    });
};

export { getTicket };
