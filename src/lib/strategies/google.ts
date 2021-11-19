import GoogleStrategy, { ExtraVerificationParams } from 'passport-google-oauth20';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

const setupGoogleStrategy = () => {
	const strategy = new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(
			_accessToken: string,
			_refreshToken: string,
			_extraParams: ExtraVerificationParams,
			profile,
			done: any,
		) => {
			const user = profile._json;
			const now = new Date();

			getDB().users.findOneAndUpdate(
				{ providerId: user.sub },
				{
					$set: {
						email: user.email,
						isVerified: user.email_verified,
						name: user.name,
						picture: user.picture,
						locale: user.locale,
						providerId: user.sub,
						updatedAt: now,
						provider: 'Google',
					},
					$setOnInsert: {
						permissions: User.permissions,
						systemOrganisationId: process.env.ORGANISATION_ID,
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
