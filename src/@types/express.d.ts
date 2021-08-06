import { Profile } from 'passport-auth0';
import { IUserPermissions } from '@user/controllers/userController';
import express from 'express';

interface ISessionUser extends Profile {
	permissions: IUserPermissions['permissions'];
	systemOrganisationId: string;
	organisationId: string | null;
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
