import { getDB } from '@database/db';
import { User } from '../../../types/user';
import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import argon2 from 'argon2';
import { Request, Response } from 'express';
import { handleError } from '@errors/handleError';


export const emailPasswordMatch = async (
  email: string,
  password: string,
  req: Request,
  res: Response
): Promise<User | Response> => {
  const badEmailOrPasswordMsg = 'Email or password is invalid';

  const user = await getDB().users.findOne({ email });
  if (!user) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code, badEmailOrPasswordMsg)
    });
  }

  const validPassword = await argon2
    .verify(user.password, password)
    .catch(err => handleError(err, req, res));


  if (!validPassword) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code, badEmailOrPasswordMsg)
    });
  }

  return user;
};
