import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/login', passport.authenticate('auth0', { scope: 'openid email profile permissions' }), (req, res) => {
	return res.redirect(`https://${process.env.ISSUER_BASEURL}`);
});

export default router;
