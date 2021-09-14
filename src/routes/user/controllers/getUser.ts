import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { getSafeUser } from '../helpers/getSafeUser';

const getUser = (req: Request, res: Response) => {
	const user = getSafeUser(req);

	if (!user) return res.status(500).send({ ...responseGenerator(500, 'No user found') });
	return res.status(200).send({
		...responseGenerator(200),
		user,
	});
};

export { getUser };
