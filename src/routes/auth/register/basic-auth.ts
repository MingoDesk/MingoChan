import { createLocalUser } from '@database/user/create-local-user';
import { handleError } from '@errors/handle-error';
import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const signUpBasicAuth = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code),
      errors: errors.array()
    });
  }

  await createLocalUser(email, password).catch(e => handleError(e, req, res));

  return res.status(HTTP_STATUS.SUCCESS.code).send({
    ...responseGenerator(HTTP_STATUS.SUCCESS.code)
  });
};
