import { getDB } from '@database/db';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';

export const setupLocalStrategy = (): Strategy => {
	const localStrategy: Strategy = new Strategy(async (username: string, password: string, done: any) => {
		const user = await getDB().users.findOne({ email: username.trim().toLowerCase() });
		if (!user) return done(null, false, { msg: 'Invalid password or email' });
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) return done(null, false, { msg: 'Invalid password or email' });
		return done(null, user);
	});
	return localStrategy;
};
