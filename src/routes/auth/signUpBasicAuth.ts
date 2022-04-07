import { createLocalUser, NewLocalUser } from '@database/user/createLocalUser';
import { handleError } from '@errors/handleError';
import { HTTP_STATUS } from '@util/httpStatus';
import { responseGenerator } from '@util/responseGenerator';
import { Response } from 'express';
import { validationResult } from 'express-validator';
import { generateUserJwt } from '@security/generateUserJwt';
import { BasicAuthRequest } from './auth-validators';
import { getSafeUser } from '@util/getSafeUser';


export const signUpBasicAuth = async (req: BasicAuthRequest, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code),
      errors: errors.array()
    });
  }

  const { email, password } = req.body;
  const user = await createLocalUser(email, password).catch(e => {
    console.log('This is where we threw!');
    handleError(e, req, res);
  });

  if (!user) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).send({
      ...responseGenerator(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
    });
  }

  const token = generateUserJwt<NewLocalUser>(user);

  res.setHeader('token', token);
  return res.status(HTTP_STATUS.SUCCESS.code).send({
    ...responseGenerator(HTTP_STATUS.SUCCESS.code),
    data: getSafeUser(user)
  });
};
