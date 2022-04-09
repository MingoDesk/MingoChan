import { emailExists } from '@util/email-exists';
import { RequestHandler } from 'express';
import { check } from 'express-validator';

interface Methods {
  method: 'signUpWithBasicAuth' | 'loginWithBasicAuth';
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
    case 'loginWithBasicAuth':
      return [
        check('email', 'email failed validation')
          .exists()
          .normalizeEmail()
          .isEmail()
          .escape(),
        check('password', 'password must contain at least 6 characters')
          .exists()
          .isString()
          .escape()
      ];
    default: return [];
  }
};
