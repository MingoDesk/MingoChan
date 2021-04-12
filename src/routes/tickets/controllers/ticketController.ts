import { body } from "express-validator";

export interface IMessage {
  author: string;
  text: string;
  createdAt: string;
  editedAt: string;
  editedBy: string;
}

export interface INotes extends IMessage {
  isNote: true;
}

export interface ITicket {
  authorId: string;
  author: string;
  assignee: string;
  creadedAt: Date;
  isStarred: boolean;
  tags: string[];
  labels: string[];
  rating: Number | null;
  isUpdated?: boolean;
  messages?: IMessage[];
  notes?: INotes[];
  personnelView: INotes[] | IMessage[];
}

export interface INewTicket {
  text: string;
  author: string;
  createdAt?: Date;
}

const validate = (method: string) => {
  switch (method) {
    case "createTicket": {
      return [
        body("authorId", "Field authorId failed validation").exists().isString().notEmpty().escape(),
        body("text", "Field text failed validation").exists().isString().notEmpty().escape(),
      ];
    }
    case "updateTicket": {
      return [
        body("id", "Field id failed validation").exists().isString().notEmpty().escape(),
        body("authorId", "Field authorId failed validation").exists().isString().notEmpty().escape(),
        body("text", "Field text failed validation").exists().isString().notEmpty().escape(),
      ];
    }
  }
};

export { validate };
