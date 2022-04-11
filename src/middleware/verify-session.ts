import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';


export const verifySession = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization || (req.headers.authorization && req.headers.authorization.split(' ')[0] !== 'Bearer')) {
    return res.status(HTTP_STATUS.UNATHORIZED.code).send({
      ...responseGenerator(HTTP_STATUS.UNATHORIZED.code)
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(HTTP_STATUS.UNATHORIZED.code).send({
        ...responseGenerator(HTTP_STATUS.UNATHORIZED.code)
      });
    }

    req.user = (payload as JwtPayload).data;
    next();
  });
};
