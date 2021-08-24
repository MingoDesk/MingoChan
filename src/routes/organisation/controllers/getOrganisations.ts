import { getDB } from '@database/db';
import { find } from '@tadashi/mongo-cursor-pagination';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';

const getOrganisations = async (req: Request, res: Response) => {
	const hasNext = Boolean(req.query.hasNext);
	const hasPrevious = Boolean(req.query.hasPrevious);

	const organisations = await find(getDB().organisations, {
		limit: parseInt(process.env.PAGINATION_LIMIT, 10),
		query: {},
		next: hasNext ? req.params.nextHash : null,
		previous: hasPrevious ? req.params.nextHash : null,
	});

	if (!Array.isArray(organisations.results) || !organisations.results.length) {
		return res.status(200).send({
			...responseGenerator(200, "You don't have any organisations!"),
		});
	}

	return res.status(200).send({
		...responseGenerator(200, 'organisations incoming!'),
		data: organisations,
		hasNext: organisations.hasNext,
		hasPrevious: organisations.hasPrevious,
	});
};

export { getOrganisations };
