import { getDB } from '@database/db';
import { Request, Response } from 'express';
import { responseGenerator } from '@util/responseGenerator';
import { matchedData, validationResult } from 'express-validator';

const updateUserPermissions = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const updatedUser = await getDB().users.findOneAndUpdate(
    { _id: data.userId },
    { $set: { permissions: data.permissions } },
    { returnOriginal: false },
  );

  if (!updatedUser.value) {
    return res.status(500).send({
      ...responseGenerator(500, 'Failed to update user, please try again!'),
    });
  }
};

export { updateUserPermissions };
