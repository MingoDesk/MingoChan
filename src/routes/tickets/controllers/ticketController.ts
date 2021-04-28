import { body } from "express-validator";

export interface IMessage {
  authorId: string;
  text: string;
  createdAt: Date;
  id: string;
}

export interface INoteData extends IMessage {
  id: string;
  isNote?: true;
}

export interface IPersonnelView extends IMessage, INoteData {}

export interface ITicket {
  authorId: string;
  author: string;
  assignee: string;
  creadedAt: Date;
  isStarred: boolean;
  tags: string[];
  labels: string[];
  rating?: number;
  isUpdated: boolean;
  messages: IMessage[];
  notes?: INoteData[];
  personnelView: IPersonnelView[];
}

const validate = (method: string) => {
  switch (method) {
    case "createTicket": {
      return [
        body("authorId", "Field authorId failed validation").exists().isString().notEmpty().escape(),
        body("text", "Field text failed validation").exists().isString().notEmpty().escape(),
      ];
    }
    case "replyTicket": {
      return [
        body("id", "Field id failed validation").exists().isString().notEmpty().escape(),
        body("authorId", "Field authorId failed validation").exists().isString().notEmpty().escape(),
        body("text", "Field text failed validation").exists().isString().notEmpty().escape(),
      ];
    }
  }
};

export { validate };
