import { RequestHandler } from 'express';
import { body } from 'express-validator';

export enum TicketStatus {
	open = 1,
	updated,
	snoozed,
	closed,
}

export interface IMessage {
	authorId: string;
	author: string;
	text: string;
	createdAt: Date;
	id: string;
}

export interface INote extends IMessage {
	id: string;
	isNote: true;
}

export interface IPersonnelView {
	id: string;
	isNote?: true;
}

export interface ITicketMetaData {
	authorId: string;
	author: string;
	status: TicketStatus;
	assignee?: string;
	createdAt: Date;
	isStarred: boolean;
	tags: string[];
	labels: string[];
	previewText: string;
	subject: string;
}

export interface ITicket extends ITicketMetaData {
	rating?: number;
	messages: IMessage[];
	notes?: INote[];
	personnelView: IPersonnelView[];
}

interface IValidationMethods {
	method: 'createTicket' | 'replyTicket' | 'assignTicket' | 'ticketSatisfaction' | 'updateTicketStatus';
}

const validate = (method: IValidationMethods['method']): RequestHandler[] => {
	switch (method) {
		case 'createTicket': {
			return [
				body('text', 'Field text failed validation').exists().isString()
					.notEmpty()
					.escape(),
				body('subject', 'Field subject failed validation').exists().isString()
					.notEmpty()
					.escape(),
			];
		}
		case 'replyTicket': {
			return [
				body('ticketId', 'Field ticketId failed validation').exists().isMongoId()
					.notEmpty()
					.escape(),
				body('text', 'Field text failed validation').exists().isString()
					.notEmpty()
					.escape(),
			];
		}
		case 'assignTicket': {
			return [
				body('ticketId', 'Field userId failed validation').exists().isMongoId()
					.notEmpty()
					.escape(),
				body('assignTo', 'Field userId failed validation').exists().isString()
					.escape()
					.optional(),
			];
		}
		case 'ticketSatisfaction': {
			return [
				body('ticketId', 'Field userId failed validation').exists().isString()
					.notEmpty()
					.escape(),
				body('satisfactionLevel', 'Field satisfactionLevel failed validation')
					.exists()
					.isInt({ min: 1, max: 3 })
					.notEmpty()
					.escape(),
			];
		}
		case 'updateTicketStatus': {
			return [
				body('ticketId', 'Field userId failed validation').exists().isString()
					.notEmpty()
					.escape(),
				body('status', 'Field status failed validation')
					.exists()
					.isInt({ min: TicketStatus.open, max: TicketStatus.closed })
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
