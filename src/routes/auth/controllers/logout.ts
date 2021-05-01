import { Router, Response, Request, NextFunction } from "express";
import queryString from "query-string";
import { URL } from "url";

const router = Router();

router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect(process.env.BASE_REDIRECT_URL);
});

export default router;
