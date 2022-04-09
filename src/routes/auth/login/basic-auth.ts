import { generateUserJwt } from '@security/generate-user-jwt';
import { User } from '@@types/user';
import { getSafeUser } from '@util/get-safe-user';
import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { emailPasswordMatch } from '../helpers/email-password-match';

export const basicAuthLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).send({
      ...responseGenerator(HTTP_STATUS.BAD_REQUEST.code),
      errors: errors.array()
    });
  }

  const user = await emailPasswordMatch(req.body.email, req.body.password, req, res);
  const token = generateUserJwt(user);

  return res.status(HTTP_STATUS.SUCCESS.code).send({
    ...responseGenerator(HTTP_STATUS.SUCCESS.code),
    data: getSafeUser((user as User)),
    token,
    jwt_exp: process.env.JWT_EXP
  });
};
