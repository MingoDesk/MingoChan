import Auth0Strategy, { ExtraVerificationParams, Profile } from "passport-auth0";
import { getDB } from "../database/db";

const setupStrategy = () => {
  const strategy = new Auth0Strategy(
    {
      domain: process.env.ISSUERBASEURL,
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET,
      callbackURL: `${process.env.BASEURL}/api/callback`,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      extraParams: ExtraVerificationParams,
      profile,
      done: any
    ): Promise<any> {
      // Note that these parameters will only be availbe if the rule "Add country to the user profile" is enabled on the auth0 project. If these values are null, check there.
      const { "https://mingochan.com/country": country, "https://mingochan.com/timezone": timezone } = profile._json;

      getDB().users.findOneAndUpdate(
        { _id: profile.id },
        { $set: { ...profile._json, country, timezone } },
        { upsert: true, returnOriginal: false },
        (err, res) => {
          if (err) return done(err);
          return done(null, res.value);
        }
      );
    }
  );

  return strategy;
};
export { setupStrategy };
