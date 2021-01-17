import { Request, Response, Express } from "express";
import { Session } from "express-session";
import * as cookieParser from "cookie-parser";

export interface ctx {
  req: Request & { session: Session; cookieParser };
  res: Response;
}
