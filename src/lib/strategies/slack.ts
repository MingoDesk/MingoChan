import { ExtraVerificationParams, Strategy as SlackStrategy } from 'passport-slack-oauth2';
import { getDB } from '@database/db';
import { User } from '@user/controllers/userController';

const setupSlackStrategy = (): SlackStrategy => {
  const strategy: SlackStrategy = new SlackStrategy(
    {
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/slack/callback`,
      scope: ['identity.openid', 'identity.email', 'identity.profile', 'identity.basic'],
    },
    (
      _accessToken: string,
      _refreshToken: string,
      _extraParams: ExtraVerificationParams,
      profile: any,
      done: any,
    ) => {
      const user = profile.user;
      const now = new Date();

      getDB().users.findOneAndUpdate(
        { providerId: user.id },
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
            providerId: user.id,
            updatedAt: now,
            provider: 'Slack',
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
