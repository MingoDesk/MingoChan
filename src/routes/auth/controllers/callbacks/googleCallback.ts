import {
  Router, Response, Request, NextFunction,
} from 'express';
import passport from 'passport';

const router = Router();

/* eslint-disable */
router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('google', (err, user) => {
		if (err) return next(err);
		if (!user) return res.redirect('/login/google');
		req.logIn(user, (err) => {
			if (err) return next(err);
			res.redirect(process.env.BASE_REDIRECT_URL);
		});
	})(req, res, next);
});
/* eslint-enable */
export default router;
