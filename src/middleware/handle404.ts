import { HTTP_STATUS } from '../util/http-status';
import { MingoChanError } from '../errors/MingoChanError';
import { NextFunction } from 'express';
import { handleError } from '@errors/handleError';
import { Request, Response } from 'express-serve-static-core';


export const handle404 = (req: Request, res: Response, next: NextFunction, err?: MingoChanError,) => {
  if (!err) {
    next(handleError(new MingoChanError(HTTP_STATUS.NOT_FOUND.code, 'No such endpoint'), req, res));
  }
  next();
};
