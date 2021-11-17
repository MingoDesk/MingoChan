import passport from 'passport';
import { Router, Response, Request, NextFunction } from 'express';


const router = Router();

/* eslint-disable */
router.get('/basic/callback', (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('local', (err, user) => {
		if (err) return next(err);
		if (!user) return res.redirect('/login/local');
		req.logIn(user, err => {
			if (err) return next(err);
			res.redirect(process.env.BASE_REDIRECT_URL);
		});
	})(req, res, next);
});
/* eslint-enable */
export default router;
