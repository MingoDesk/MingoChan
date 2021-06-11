import Auth0Strategy, { ExtraVerificationParams } from 'passport-auth0';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

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
			const {
				'https://mingochan.com/country': country,
				'https://mingochan.com/timezone': timezone,
				sub,
				email,
				email_verified,
				name,
				nickname,
				updated_at,
				picture,
			} = profile._json;

			console.log(profile);

			getDB().users.findOneAndUpdate(
				{ _id: sub },
				{
					$set: {
						email,
						email_verified,
						name,
						nickname,
						picture,
						country,
						timezone,
						updatedAt: updated_at,
					},
					$setOnInsert: { permissions: User.permissions },
				},
				{ upsert: true, returnOriginal: false },
				(err, res) => {
					console.log(res.value);
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
