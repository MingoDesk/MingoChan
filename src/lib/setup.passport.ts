import { Application } from 'express';
import passport from 'passport';
import session from 'express-session';
import connectRedis, { RedisStore } from 'connect-redis';
import redis, { RedisClient, ClientOpts } from 'redis';
import { v4 as uuid } from 'uuid';
import { serialize, deserialize } from './serialize';
import { setupGoogleStrategy } from '@lib/strategies/google';
import { setupSlackStrategy } from '@lib/strategies/slack';
import { setupLocalStrategy } from './strategies/local';

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
        sameSite: IS_PROD ? 'strict' : 'none',
        secure: IS_PROD,
        domain: process.env.BASE_REDIRECT_URL
      },
      genid() {
        return uuid();
      },
    }),
  );

  passport.use(setupGoogleStrategy());
  passport.use(setupSlackStrategy());
  passport.use(setupLocalStrategy());
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  app.use(passport.initialize());
  app.use(passport.session());
}

export default initializeAuth;
