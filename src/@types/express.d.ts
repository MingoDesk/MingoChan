import { Profile } from 'passport-auth0';
import { ISysAdmin, IStaff, IStaffAdmin, IOrgUser } from 'routes/user/controllers/userController';
import express = require('express');

interface ISessionUser extends Profile {
	permissions: ISysAdmin['permissions'] | IStaff['permissions'] | IStaffAdmin['permissions'] | IOrgUser['permissions'];
}

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
