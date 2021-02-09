import { Profile } from "passport-auth0";

interface sessionUser extends Profile {
  isLoggedIn: boolean;
}

declare module "express-session" {
  interface SessionData {
    user: sessionUser;
    returnTo: string;
  }
}

declare global {
  namespace Express {
    interface Request {}
  }
}
