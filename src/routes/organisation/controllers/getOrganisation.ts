import { getDB } from '@database/db';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';

const getOrganisation = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const organisation = await getDB().organisations.findOne({ _id: data.organisationId });

  if (!organisation) return res.status(400).send({ ...responseGenerator(400, 'No organisation with that ID') });

  return res.status(200).send({ ...responseGenerator(200), data: { ...organisation } });
};

export { getOrganisation };
