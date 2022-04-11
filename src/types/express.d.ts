import { IUserPermissions } from '@user/controllers/userController';
import express from 'express';
import { Profile } from 'passport-auth0';
import { ObjectId } from 'mongodb';
import { User as ISessionUser } from './user';

declare module 'express-session' {
	interface session {
		user: ISessionUser;
		returnTo: string;
	}
}

declare global {
	namespace Express {
		interface User extends ISessionUser {}
		interface Request {
			user?: User;
		}
	}
}
