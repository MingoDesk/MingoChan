import { Request, Response, NextFunction } from 'express';

function secured(req: Request, res: Response, next: NextFunction) {
	if (req.user) {
		return next();
	}
	return res.status(403).send({ success: false, errors: 'Not logged in', msg: 'Log in lol' });
}

export { secured };
