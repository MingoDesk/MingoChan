import { RequestHandler } from 'express';
import { check } from 'express-validator';

interface Methods {
  method: 'createTicket';
}

export const validate = (method: Methods['method']): RequestHandler[] => {
  switch (method) {
    case 'createTicket':
      return [
        check('body', 'body failed validation').exists().isObject().notEmpty(),
        check('subject', 'subject failed validation').exists().isString().notEmpty().escape(),
      ];
    default: return [];
  }
};
