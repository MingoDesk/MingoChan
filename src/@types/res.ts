import { Request } from "express";
import { Session } from "express-session";
import { ObjectId } from "mongodb";
import { IPhoneData } from "../routes/user/helpers/verifyUserInput";

interface userSession extends Session {
  user?: {
    isLoggedIn: boolean;
    _id: ObjectId;
    name: string;
    password: string;
    email: string;
    phone: IPhoneData;
    emailVerified: boolean;
    verifiedCustomer: boolean;
  };
}

export interface ReqCtx extends Request {
  session: userSession;
}
