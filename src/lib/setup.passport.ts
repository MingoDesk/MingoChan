import { Application } from 'express';
import passport from 'passport';
import session from 'express-session';
import connectRedis, { RedisStore } from 'connect-redis';
import redis, { RedisClient, ClientOpts } from 'redis';
import { v4 as uuid } from 'uuid';
import { auth0Serialize, auth0Deserialize } from '@lib/serialize';
import { setupGoogleStrategy } from '@lib/strategies/google';
import { setupSlackStrategy } from '@lib/strategies/slack';

function initializeAuth(app: Application): void {
	const redisStore: RedisStore = connectRedis(session);
	const IS_PROD = process.env.NODE_ENV === 'production';

	// Sessions, auth, and redis setup
	const redisSettings: ClientOpts = {
		url: process.env.REDIS_URI,
	};

	const redisClient: RedisClient = redis.createClient(redisSettings);
	app.use(
		session({
			name: process.env.INSTANCE_NAME,
			store: new redisStore({ client: redisClient }),
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: true,
			cookie: {
				maxAge: parseInt(process.env.SESSION_LIFETIME, 10) * 60 * 60 * 60,
				sameSite: IS_PROD,
				secure: IS_PROD,
			},
			genid: function () {
				return uuid();
			},
		}),
	);

	passport.use(setupGoogleStrategy());
	passport.use(setupSlackStrategy());
	passport.serializeUser(auth0Serialize);
	passport.deserializeUser(auth0Deserialize);
	app.use(passport.initialize());
	app.use(passport.session());
}

export { initializeAuth };
