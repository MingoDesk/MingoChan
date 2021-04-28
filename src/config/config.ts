import { systemSettings } from "../routes/system/controllers/systemsController";

interface IDatabaseCollections {
  users: string;
  tickets: string;
  settings: string;
}

const datbaseCollections: IDatabaseCollections = {
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
  "DOMAIN",
];

const systemConfigdefaults: systemSettings = {
  ratings: true,
  snoozing: true,
  allowNotesEdit: true,
  allowUserSeeTicketStatus: true,
  defaultTheme: "light",
  avgUserSatisfaction: 3,
  avgRespTime: null,
  prefDataType: "JSON",
};

export { datbaseCollections, envFilter, systemConfigdefaults };
