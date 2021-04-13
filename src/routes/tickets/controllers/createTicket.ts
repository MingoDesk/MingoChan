import { getDB } from "../../../database/db";
import { validationResult } from "express-validator";
import { matchedData } from "express-validator";
import { ITicket } from "./ticketController";

// TODO: Make sure to incorporate diffirent callbacks depending on user permissions

// TODO: Add userinfo such as createdBy/author and user icon from session data instead of from the request body (This can only be done one auth is implemented again) and Add more userdata to each message

const createTicket = async (req, res): Promise<ITicket> => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: "Bad request", errors: errors.array() });
  }

  const createdAt = new Date();

  const newTicket = await getDB().tickets.insertOne({
    authorId: data.authorId,
    assignee: null,
    createdAt,
    // TODO: Check if customer group is marked as "starred"
    isStarred: false,
    tags: [],
    labels: [],
    rating: null,
    isUpdated: true,
    messages: [{ ...data, author: data.authorId, createdAt }],
    notes: [],
    personnelView: [{ ...data, createdAt }],
  });

  if (!newTicket) {
    return res.status(500).send({
      success: false,
      msg: "Something went wrong when saving to DB, please try again",
      error: "Internal server error",
    });
  }

  return res.status(200).send({ success: true, errors: null, data: { ...newTicket.ops[0] } });
};

export { createTicket };
