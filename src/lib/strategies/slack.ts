import SlackStrategy, { ExtraVerificationParams } from 'passport-slack';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

const setupSlackStrategy = () => {
	const strategy = new SlackStrategy(
		{
			clientID: process.env.SLACK_CLIENT_ID,
			clientSecret: process.env.SLACK_SECRET,
			callbackURL: `${process.env.BASEURL}/api/slack/callback`,
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
				family_name,
				given_name,
				picture,
				locale,
			} = profile._json;

			console.log(profile, 'slack');

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
						country,
						timezone,
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
export { setupSlackStrategy };
