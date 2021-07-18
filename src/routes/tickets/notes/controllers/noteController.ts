import { RequestHandler } from 'express';
import { body } from 'express-validator';

const validate = (method: string): RequestHandler[] => {
	switch (method) {
		case 'note': {
			return [
				body('ticketId').exists().isString().notEmpty().escape(),
				body('text', 'Field text failed validation').exists().isString().notEmpty().escape(),
			];
		}
		case 'editNote': {
			return [
				body('ticketId').exists().isString().notEmpty().escape(),
				body('noteId', 'Field noteId failed validation').exists().isString().notEmpty().escape(),
				body('text', 'Field text failed validation').exists().isString().notEmpty().escape(),
			];
		}
		default: {
			return [];
		}
	}
};

export { validate };
