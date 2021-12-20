import { RequestHandler } from 'express';
import { body, check } from 'express-validator';

export enum TicketStatus {
  open = 1,
  updated,
  snoozed,
  closed,
}

export interface TipTapContent {
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs?: Record<string, any>;
  content?: TipTapContent[];
  marks?: {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs?: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}


export interface IMessage {
  authorId: string;
  author: string;
  subject: TipTapContent;
  body: TipTapContent;
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
  method:
  | 'createTicket'
  | 'replyTicket'
  | 'assignTicket'
  | 'ticketSatisfaction'
  | 'getUserAuthoredTickets'
  | 'updateTicketStatus';
}

const validate = (method: IValidationMethods['method']): RequestHandler[] => {
  switch (method) {
    case 'createTicket': {
      return [
        body('body', 'Field body failed validation').exists().isObject().notEmpty(),
        body('subject', 'Field subject failed validation').exists().isObject().notEmpty(),
      ];
    }
    case 'getUserAuthoredTickets': {
      return [
        check('userId', 'Field userId failed validation').exists().isString().escape().isLength({ min: 0, max: 100 }),
        check('hasNext', 'Field hasNext failed validation').optional().isBoolean(),
        check('hasPrevious', 'Field hasPrevious failed validation').optional().isBoolean(),
      ];
    }
    case 'replyTicket': {
      return [
        body('ticketId', 'Field ticketId failed validation')
          .exists()
          .isMongoId()
          .notEmpty()
          .escape(),
        body('body', 'Field body failed validation').exists().isObject().notEmpty(),
        body('subject', 'Field subject failed validation').exists().isObject().notEmpty(),
      ];
    }
    case 'assignTicket': {
      return [
        body('ticketId', 'Field userId failed validation').exists().isMongoId().notEmpty().escape(),
        body('assignTo', 'Field userId failed validation').exists().isString().escape().optional(),
      ];
    }
    case 'ticketSatisfaction': {
      return [
        body('ticketId', 'Field userId failed validation').exists().isString().notEmpty().escape(),
        body('satisfactionLevel', 'Field satisfactionLevel failed validation')
          .exists()
          .isInt({ min: 1, max: 3 })
          .notEmpty()
          .escape(),
      ];
    }
    case 'updateTicketStatus': {
      return [
        body('ticketId', 'Field userId failed validation').exists().isString().notEmpty().escape(),
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
