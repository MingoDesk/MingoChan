import { Request } from 'express';

function secured(req: Request, res, next) {
	if (req.user) {
		return next();
	}
	return res.redirect(`${process.env.BASEURL}/api/login`);
}

export { secured };
