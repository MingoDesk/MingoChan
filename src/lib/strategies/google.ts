import GoogleStrategy, { ExtraVerificationParams } from 'passport-google-oauth20';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

const setupGoogleStrategy = () => {
	const strategy = new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: `${process.env.BASEURL}/api/google/callback`,
		},
		(_accessToken: string, _refreshToken: string, _extraParams: ExtraVerificationParams, profile, done: any) => {
			const { sub, email, email_verified, name, family_name, given_name, picture, locale } = profile._json;

			getDB().users.findOneAndUpdate(
				{ _id: sub },
				{
					$set: {
						email,
						email_verified,
						name,
						given_name,
						family_name,
						picture,
						locale,
						updatedAt: Date.now(),
					},
					$setOnInsert: {
						permissions: User.permissions,
						systemOrganisationId: process.env.ORGANISATIONID,
					},
				},
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
export { setupGoogleStrategy };
