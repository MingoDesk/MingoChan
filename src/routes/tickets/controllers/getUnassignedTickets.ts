import { getDB } from '../../../database/db';
import { find } from 'mongo-cursor-pagination';

const getUnassignedTickets = async (req, res) => {
  const data = await find(getDB().tickets, {
    limit: 50,
    fields: { assignee: null },
    next: req.query.hasNext == 'true' ? true : false,
  });

  if (!data)
    return res.status(200).send({ sucess: false, error: 'No tickets found', msg: "There aren't any tickets 🥳" });

  return res.status(200).send({
    success: true,
    errors: null,
    data: {
      ...data,
    },
  });
};

export { getUnassignedTickets };
