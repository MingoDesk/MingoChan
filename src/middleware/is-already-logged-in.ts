import { HTTP_STATUS } from '@util/http-status';
import { responseGenerator } from '@util/response-generator';
import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';


// If user is already logged in just say success, if not continue the user in the authentication flow
export const isAlreadyLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, payload) => {
      if (!err) {
        req.user = (payload as JwtPayload).data;
        res.status(HTTP_STATUS.SUCCESS.code).send({
          ...responseGenerator(HTTP_STATUS.SUCCESS.code)
        });
      }
    });
  }

  next();
};
