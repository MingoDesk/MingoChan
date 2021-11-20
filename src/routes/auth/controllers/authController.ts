import { body } from 'express-validator';
import { RequestHandler } from 'express';

interface IValidationMethods {
	method: 'generateCdnToken';
}

const validate = (method: IValidationMethods['method']): RequestHandler[] => {
	switch (method) {
		case 'generateCdnToken': {
			return [
				body('ticketId', 'Field ticketId failed validation')
					.exists()
					.isString()
					.notEmpty()
					.escape(),
			];
		}

		default: {
			return [];
		}
	}
};

export { validate };
