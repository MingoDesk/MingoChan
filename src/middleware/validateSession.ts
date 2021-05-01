import { Request, Response, NextFunction } from "express";

function secured(req: Request, res: Response, next: NextFunction) {
  console.log(req.user);
  if (req.user) {
    return next();
  }
  return res.status(400).send({ erorr: "Bad request", msg: "You're not logged in! Please login", success: false });
}

export { secured };
