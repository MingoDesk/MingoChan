import { Profile } from 'passport-auth0';
import { ISysAdmin, IStaff, IStaffAdmin, IOrgUser } from 'routes/user/controllers/userController';
import express = require('express');

interface sessionUser extends Profile {
	permissions: ISysAdmin['permissions'] | IStaff['permissions'] | IStaffAdmin['permissions'] | IOrgUser['permissions'];
}

declare module 'express-session' {
	interface session {
		user: sessionUser;
		returnTo: string;
	}
}

declare module 'express' {
	interface User extends sessionUser {}
	interface Request {
		user: User;
	}
}
