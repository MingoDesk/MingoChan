import { body } from "express-validator";

interface tag {
  name: string;
  color: string;
  backgrundColor: string;
}

// TODO: Figure out how the hell we should do templates
interface template {}

interface group {
  name: string;
  members: string[];
  tier: "T1" | "T2" | "T3" | "T4";
  star: boolean;
}

export interface systemSettings {
  tags?: tag[];
  ratings: boolean;
  snoozing: boolean;
  defaultTheme: "light" | "dark";
  allowNotesEdit: boolean;
  allowUserSeeTicketStatus: boolean;
  groups?: group[];
  avgUserSatisfaction: 1 | 2 | 3;
  avgRespTime: string | null;
  prefDataType: "JSON" | "CSV";
}

const validate = (method: string) => {
  switch (method) {
    case "update": {
      return [
        body("tags").isArray(),
        body("ratings").isBoolean(),
        body("snoozing").isBoolean(),
        body("groups").isArray(),
        body("defaultTheme")
          .isString()
          .matches(/^(light|dark)$/),
        body("allowNotesEdit").isBoolean(),
        body("prefDataType")
          .isString()
          .matches(/^(JSON|CSV)$/),
      ];
    }
  }
};

export { validate };
