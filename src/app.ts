import { Application } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import redis, { RedisClient } from "redis";
import helmet from "helmet";
import "reflect-metadata";
import { setupDB } from "./database/db";
import connectRedis, { RedisStore } from "connect-redis";
import { checkEnvVars } from "./util/checkEnvVars";
import express from "express";
const RedisStore: RedisStore = connectRedis(session);
import { v4 as uuid } from "uuid";
import { setupRoutes } from "./routes/setup";

const init = async (app: Application): Promise<void> => {
  // Check that all env variables are set
  await checkEnvVars();
  const IS_PROD = process.env.NODE_ENV === "production";

  // Setup mongo and redis
  await setupDB({ URI: process.env.MONGO_URI, name: process.env.DB_NAME });
  const RedisClient: RedisClient = redis.createClient({ url: process.env.REDIS_URI });

  // Application configuration

  app.use(express.json({ limit: "100kb", strict: true, type: "application/json" }));
  app.use(helmet());
  app.use(cookieParser());

  // Configure session and their cookies.
  app.use(
    session({
      name: process.env.SID,
      store: new RedisStore({ client: RedisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: parseInt(process.env.SESSION_LIFETIME), sameSite: IS_PROD, secure: IS_PROD },
      genid: function () {
        return uuid();
      },
    })
  );

  await setupRoutes(app);
  app.listen(process.env.PORT, () => console.info(`Listening on http://localhost:${process.env.PORT}`));
};

export { init };
