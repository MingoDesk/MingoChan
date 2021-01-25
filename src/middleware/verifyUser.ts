import { Response, NextFunction, Request } from 'express';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user)
    return res.status(400).send({
      error: 'Not logged in',
      msg: "It appears you're not logged in. Please login and try aagin!",
    });
  return next();
};

export { verifyUser };
