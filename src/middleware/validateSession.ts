import { Request, Response, NextFunction } from 'express';

function secured(req: Request, res: Response, next: NextFunction) {
	if (req.user) {
		return next();
	}
	return res.redirect(`${process.env.BASEURL}/api/login`);
}

export { secured };
