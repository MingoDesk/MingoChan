import { body } from "express-validator";

export interface IMessage {
  authorId: string;
  text: string;
  createdAt: Date;
}

export interface INoteData extends IMessage {
  isNote: true;
  id: string;
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
  rating: number | null;
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
