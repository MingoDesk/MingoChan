import { body } from "express-validator";

const validate = (method: string) => {
  switch (method) {
    case "createNote": {
      return [
        body("id").exists().isString().notEmpty().escape(),
        body("authorId", "Field authorId failed validation").exists().isString().notEmpty().escape(),
        body("text", "Field text failed validation").exists().isString().notEmpty().escape(),
      ];
    }
  }
};

export { validate };
