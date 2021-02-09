import { Router, Response, Request, NextFunction } from "express";
import queryString from "query-string";
import { URL } from "url";

const router = Router();

router.get("/logout", (req: Request, res: Response) => {
  req.logOut();

  let returnTo = req.protocol + "://" + req.hostname;
  const port = req.socket.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = process.env.NODE_ENV === "production" ? `${returnTo}/` : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(`https://${process.env.ISSUERBASEURL}/v2/logout`);

  const searchString = queryString.stringify({
    client_id: process.env.CLIENTID,
    returnTo: returnTo,
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL.toString());
});

export default router;
