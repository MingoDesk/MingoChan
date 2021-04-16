import { Router, Response, Request, NextFunction } from "express";
import passport from "passport";

const router = Router();

router.get("/login", passport.authenticate("auth0", { scope: "openid email profile" }), (req, res) => {
  return res.redirect(`https://${process.env.ISSUERBASEUR}`);
});

export default router;
