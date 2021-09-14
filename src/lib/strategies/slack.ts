import { ExtraVerificationParams, Strategy as SlackStrategy } from 'passport-slack-oauth2';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

const setupSlackStrategy = (): SlackStrategy => {
	const strategy: SlackStrategy = new SlackStrategy(
		{
			clientID: process.env.SLACK_CLIENT_ID,
			clientSecret: process.env.SLACK_SECRET,
			callbackURL: `${process.env.BASEURL}/api/auth/slack/callback`,
			scope: ['identity.openid', 'identity.email', 'identity.profile', 'identity.basic'],
		},
		(_accessToken: string, _refreshToken: string, _extraParams: ExtraVerificationParams, profile: any, done: any) => {
			const user = profile._json;
			const now = new Date();

			console.log(profile, 'slack');

			getDB().users.findOneAndUpdate(
				{ providerId: user.sub },
				{
					$set: {
						email: user.email,
						isVerified: user.email_verified,
						name: user.name,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						picture: user.image_512,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						locale: user.locale,
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						providerId: user.sub,
						updatedAt: now,
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
export { setupSlackStrategy };
