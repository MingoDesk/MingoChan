import { createLocalUser, NewLocalUser } from '@database/user/createLocalUser';
import { handleError } from '@errors/handleError';
import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { generateUserJwt } from '@security/generate-user-jwt';
import { getSafeUser } from '@util/get-safe-user';

export const signUpBasicAuth = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code),
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  const user = await createLocalUser(email, password).catch(e => handleError(e, req, res));

  if (!user) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).send({
      ...responseGenerator(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
    });
  }

  const token = generateUserJwt<NewLocalUser>(user);

  return res.status(HTTP_STATUS.SUCCESS.code).send({
    ...responseGenerator(HTTP_STATUS.SUCCESS.code),
    data: getSafeUser(user),
    token,
    jwt_exp: process.env.JWT_EXP
  });
};
