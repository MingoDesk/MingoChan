import { Router } from 'express';
import passport from 'passport';

const router: Router = Router();

router.get(
	'/login/google',
	passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }),
	(_req, res) => res.redirect('http://localhost:1928/api/auth/google/callback'),
);

router.get(
	'/login/office365',
	passport.authenticate('office365', { scope: ['openid', 'email', 'profile'] }),
	(_req, res) => res.redirect(`http://${process.env.BASE_URL}`),
);

router.get(
	'/login/slack',
	passport.authenticate('Slack', { scope: ['openid', 'email', 'profile'] }),
	(_req, res) => res.redirect(`http://${process.env.BASE_URL}`),
);
export default router;
