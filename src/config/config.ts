import {
  ISystemSettings,
  Themes,
  PrefDataType,
  AvgUserSatisfaction,
} from '../routes/system/controllers/systemsController';

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
  'REDIS_URI',
  'CLIENT_ID',
  'SECRET',
  'BASEURL',
  'SESSION_LIFETIME',
  'ISSUER_BASEURL',
  'PAGINATION_LIMIT'
];

const systemConfigdefaults: ISystemSettings = {
  ratings: true,
  snoozing: true,
  allowNotesEdit: true,
  allowUserSeeTicketStatus: true,
  defaultTheme: Themes.light,
  avgUserSatisfaction: AvgUserSatisfaction.awesome,
  prefDataType: PrefDataType.json,
};

export { datbaseCollections, envFilter, systemConfigdefaults };
