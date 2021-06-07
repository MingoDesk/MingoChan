import { body } from 'express-validator';

export enum TicketStatus {
	open = 1,
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
	isNote?: true;
}

export interface IPersonnelView {
	id: string;
	isNote?: true;
}

export interface ITicket {
	authorId: string;
	author: string;
	status: TicketStatus;
	assignee?: string;
	createdAt: Date;
	isStarred: boolean;
	tags: string[];
	labels: string[];
	rating?: number;
	isUpdated: boolean;
	messages: IMessage[];
	notes?: INote[];
	personnelView: IPersonnelView[];
}

const validate = (method: string) => {
	switch (method) {
		case 'createTicket': {
			return [body('text', 'Field text failed validation').exists().isString().notEmpty().escape()];
		}
		case 'replyTicket': {
			return [
				body('ticketId', 'Field ticketId failed validation').exists().isString().notEmpty().escape(),
				body('text', 'Field text failed validation').exists().isString().notEmpty().escape(),
			];
		}
		case 'assignTicket': {
			return [
				body('ticketId', 'Field userId failed validation').exists().isString().notEmpty().escape(),
				body('assignTo', 'Field userId failed validation').exists().escape(),
			];
		}
		case 'ticketSatisfaction': {
			return [
				body('ticketId', 'Field userId failed validation').exists().isString().notEmpty().escape(),
				body('satisfactionLevel', 'Field satisfactionLevel').exists().isInt({ min: 1, max: 3 }).notEmpty().escape(),
			];
		}
	}
};

export { validate };
