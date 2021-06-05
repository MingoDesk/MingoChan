import { Router, Response, Request } from 'express';

const router = Router();

router.get('/logout', (req: Request, res: Response) => {
	req.logout();
	res.redirect(process.env.BASE_REDIRECT_URL);
});

export default router;
