import { Application } from "express";
import Auth0Strategy, { ExtraVerificationParams, Profile } from "passport-auth0";
import passport from "passport";
import session from "express-session";
import connectRedis, { RedisStore } from "connect-redis";
import redis, { RedisClient, ClientOpts } from "redis";
import { v4 as uuid } from "uuid";
import { auth0Serialize, auth0Deserialize } from "./serialize";
import { getDB } from "../../database/db";

export async function intaltizeAuth(app: Application): Promise<void> {
  const RedisStore: RedisStore = connectRedis(session);
  const IS_PROD = process.env.NODE_ENV === "production";

  // Sessions ann auth

  const redisSettings: ClientOpts = {
    url: process.env.REDIS_URI,
  };

  const redisClient: RedisClient = redis.createClient(redisSettings);
  app.use(
    session({
      name: process.env.SID,
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: parseInt(process.env.SESSION_LIFETIME), sameSite: IS_PROD, secure: IS_PROD },
      genid: function () {
        return uuid();
      },
    })
  );

  const strategy = new Auth0Strategy(
    {
      domain: process.env.ISSUERBASEURL,
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET,
      callbackURL: `${process.env.BASEURL}/callback`,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      extraParams: ExtraVerificationParams,
      profile,
      done: any
    ): Promise<any> {
      getDB().users.findOneAndUpdate(
        { _id: profile.id },
        { $set: { ...profile._json } },
        { upsert: true, returnOriginal: false },
        (err, res) => {
          if (err) return done(err);
          return done(null, res.value);
        }
      );
    }
  );
  passport.use(strategy);
  passport.serializeUser(auth0Serialize);
  passport.deserializeUser(auth0Deserialize);
  app.use(passport.initialize());
  app.use(passport.session());
}
