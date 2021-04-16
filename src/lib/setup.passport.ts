import { Application } from "express";
import passport from "passport";
import session from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import redis, { RedisClient, ClientOpts } from "redis";
import { v4 as uuid } from "uuid";
import { auth0Serialize, auth0Deserialize } from "./serialize";
import { setupStrategy } from "./passport.strategy";

async function intaltizeAuth(app: Application): Promise<void> {
  const redisStore: RedisStore = connectRedis(session);
  const IS_PROD = process.env.NODE_ENV === "production";

  // Sessions ann auth

  const redisSettings: ClientOpts = {
    url: process.env.REDIS_URI,
  };

  const redisClient: RedisClient = redis.createClient(redisSettings);
  app.use(
    session({
      name: process.env.SID,
      store: new redisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: parseInt(process.env.SESSION_LIFETIME),
        sameSite: IS_PROD,
        secure: IS_PROD,
      },
      genid: function () {
        return uuid();
      },
    })
  );

  passport.use(setupStrategy());
  passport.serializeUser(auth0Serialize);
  passport.deserializeUser(auth0Deserialize);
  app.use(passport.initialize());
  app.use(passport.session());
}

export { intaltizeAuth };
