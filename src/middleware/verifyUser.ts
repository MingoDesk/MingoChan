import { Response, NextFunction } from "express";
import { ReqCtx } from "../@types/res";

const verifyUser = (req: ReqCtx, res: Response, next: NextFunction) => {
  if (!req.session.user)
    return res.status(400).send({
      error: "Not logged in",
      msg: "It appears you're not logged in. Please login and try aagin!",
    });
  return next();
};

export { verifyUser };
