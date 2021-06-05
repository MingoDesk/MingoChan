import Auth0Strategy, { ExtraVerificationParams } from 'passport-auth0';
import { getDB } from '../database/db';

const setupStrategy = () => {
	const strategy = new Auth0Strategy(
		{
			domain: process.env.ISSUER_BASEURL,
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.SECRET,
			callbackURL: `${process.env.BASEURL}/api/callback`,
		},
		(_accessToken: string, _refreshToken: string, _extraParams: ExtraVerificationParams, profile, done: any) => {
			// Note that these parameters will only be availbe if the rule "Add country to the user profile" is enabled on the auth0 project. If these values are null, check there.
			const { 'https://mingochan.com/country': country, 'https://mingochan.com/timezone': timezone } = profile._json;

			getDB().users.findOneAndUpdate(
				{ _id: profile.id },
				{ $set: { ...profile._json, country, timezone } },
				{ upsert: true, returnOriginal: false },
				(err, res) => {
					// eslint-disable-next-line
					if (err) return done(err);
					return done(null, res.value);
				},
			);
		},
	);

	return strategy;
};
export { setupStrategy };
