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
		case '/add-users': {
			return [
				body('users', 'Field users failed valition').isArray().exists().notEmpty(),
				body('organisationId', 'Field organisationId failed validation').isString().exists().notEmpty().escape(),
			];
		}
		default: {
			return [];
		}
	}
};

export { IOrganisation, validate };
