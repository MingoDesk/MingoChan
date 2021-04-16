import { Router, Response, Request, NextFunction } from "express";
import passport from "passport";

const router = Router();

router.get("/callback", async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect("/login");
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  })(req, res, next);
});

export default router;
