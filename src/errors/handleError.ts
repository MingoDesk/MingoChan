import { Response, Request } from 'express';
import { MingoChanError } from './MingoChanError';

export const handleError = (err: MingoChanError, req: Request, res: Response) => {
  req.log.error(err);

  if (!err.isOperational) {
    process.exit(1);
  }

  res.status(err.statusCode).send(err.message);
};
