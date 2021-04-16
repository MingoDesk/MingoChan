import { systemSettings } from "../routes/system/controllers/systemsController";

interface ICollections {
  users: string;
  tickets: string;
  settings: string;
}

const collections: ICollections = {
  users: "Users",
  tickets: "Tickets",
  settings: "Settings",
};

const envFilter: string[] = [
  "PORT",
  "MONGO_URI",
  "DB_NAME",
  "SESSION_SECRET",
  "NODE_ENV",
  "SID",
  "REDIS_URI",
  "CLIENTID",
  "ISSUERBASEURL",
  "SECRET",
  "BASEURL",
  "SESSION_LIFETIME",
];

const systemConfigdefaults: systemSettings = {
  tags: [],
  ratings: true,
  snoozing: true,
  allowNotesEdit: true,
  allowUserSeeTicketStatus: true,
  defaultTheme: "light",
  groups: [],
  avgUserSatisfaction: null,
  avgRespTime: null,
  prefDataType: "JSON",
};

export { collections, envFilter, systemConfigdefaults };
