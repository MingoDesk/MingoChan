import { check } from 'express-validator';

interface IOrganisation {
	name: string;
	users: string[];
}

const validate = (method: string) => {
	switch (method) {
		case 'new': {
			return [
				check('name', 'Field name failed validation').isString().exists().notEmpty().escape(),
				check('users', 'Field users failed validation').isArray().exists().notEmpty(),
			];
		}
	}
};

export { IOrganisation, validate };
