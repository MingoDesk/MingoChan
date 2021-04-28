import { Request, Response, NextFunction } from "express";

function secured(req: Request, res: Response, next: NextFunction) {
  console.log(`${process.env.DOMAIN}/api/login`);
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect(`${process.env.DOMAIN}/api/login`);
}

export { secured };
