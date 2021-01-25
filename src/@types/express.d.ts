import { isBuffer } from 'util';
import { IUser } from './user';

interface sessionUser extends IUser {
  isLoggedIn: boolean;
}

declare module 'express-session' {
  interface SessionData {
    user: sessionUser;
  }
}
