import { Profile } from 'passport-auth0';
import { IUserPermissions } from '@user/controllers/userController';
import express = require('express');

interface ISessionUser extends Profile {
	permissions: IUserPermissions;
	organisationId: string;
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
