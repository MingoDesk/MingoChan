import { emailExists } from '@util/emailExists';
import { Request, RequestHandler } from 'express';
import { check } from 'express-validator';

interface BasicAuthRequestBody {
  email: string;
  password: string;
}

export type BasicAuthRequest = Request<{}, {}, BasicAuthRequestBody>;
interface Methods {
  method: 'signUpWithBasicAuth';
}

export const validate = (method: Methods['method']): RequestHandler[] => {
  switch (method) {
    case 'signUpWithBasicAuth':
      return [
        check('email', 'email failed validation')
          .exists()
          .normalizeEmail()
          .isEmail()
          .escape()
          .custom(value => emailExists(value)),
        check('password', 'password must contain at least 6 characters')
          .exists()
          .isString()
          .isStrongPassword()
          .escape()
      ];
    default: return [];
  }
};
