import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/login', passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }), (req, res) => {
	return res.redirect(`https://${process.env.ISSUER_BASEURL}`);
});

export default router;
