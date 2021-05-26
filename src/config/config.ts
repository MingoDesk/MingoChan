import { systemSettings, Themes, PrefDataType } from '../routes/system/controllers/systemsController';

interface IDatabaseCollections {
  users: string;
  tickets: string;
  settings: string;
}

const datbaseCollections: IDatabaseCollections = {
  users: 'Users',
  tickets: 'Tickets',
  settings: 'Settings',
};

const envFilter: string[] = [
  'PORT',
  'MONGO_URI',
  'DB_NAME',
  'SESSION_SECRET',
  'NODE_ENV',
  'SID',
  'REDIS_URI',
  'CLIENT_ID',
  'ISSUER_BASEURL',
  'SECRET',
  'BASEURL',
  'SESSION_LIFETIME',
];

const systemConfigdefaults: systemSettings = {
  ratings: true,
  snoozing: true,
  allowNotesEdit: true,
  allowUserSeeTicketStatus: true,
  defaultTheme: Themes.light,
  avgUserSatisfaction: 3,
  prefDataType: PrefDataType.json,
};

export { datbaseCollections, envFilter, systemConfigdefaults };
