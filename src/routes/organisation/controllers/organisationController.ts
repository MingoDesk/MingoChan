import { body } from 'express-validator';
import { RequestHandler } from 'express';

interface IOrganisation {
	name: string;
	users: string[];
}

const validate = (method: string): RequestHandler[] => {
	switch (method) {
		case '/new': {
			return [
				body('name', 'Field name failed validation').isString().exists().notEmpty().escape(),
				body('users', 'Field users failed validation').isArray().exists().notEmpty(),
			];
		}
		default: {
			return [];
		}
	}
};

export { IOrganisation, validate };
