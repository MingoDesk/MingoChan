import { Router, Response, Request, NextFunction } from 'express';
import passport from 'passport';

const router = Router();

/* eslint-disable */
router.get('/slack/callback', (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('Slack', (err, user) => {
		if (err) return next(err);
		if (!user) return res.redirect('/login');
		req.logIn(user, err => {
			if (err) return next(err);
			res.redirect(process.env.BASE_REDIRECT_URL);
		});
	})(req, res, next);
});
/* eslint-enable */
export default router;
