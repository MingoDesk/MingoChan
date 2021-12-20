import { getDB } from '@database/db';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from './userController';

export const createLocalUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const data = matchedData(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, msg: 'Bad request', errors: errors.array() });
  }

  const userExist = await getDB().users.findOne({ email: data.email });
  if (userExist) {
    return res
      .status(400)
      .send({ ...responseGenerator(400, 'There is already a user with that email') });
  }
  const salt = await bcrypt.genSalt(12);

  const password = await bcrypt.hash(data.password, salt);

  const newUser = await getDB().users.insertOne({
    email: data.email,
    isVerified: false,
    name: null,
    password,
    permissions: User.permissions,
    systemOrganisationId: process.env.ORGANISATION_ID,
    providerId: 'local',
    locale: data.locale || 'en-EN',
    picture: 'https://fakedetail.com/userface_image/male/male1084187769378.png',
  });

  if (!newUser.ops.length) {
    return res.status(500).send({
      ...responseGenerator(500, 'Something went wrong when saving to database, please try again.'),
    });
  }

  return res.status(200).send({
    ...responseGenerator(200),
    permissions: newUser.ops[0].permissions,
    providerId: newUser.ops[0].providerId,
    email: newUser.ops[0].email,
    isVerified: newUser.ops[0].isVerified,
    locale: newUser.ops[0].locale,
    name: newUser.ops[0].name,
    picture: newUser.ops[0].picture,
  });
};
