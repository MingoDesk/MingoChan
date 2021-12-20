import {
  ISystemSettings,
  Themes,
  PrefDataType,
  AvgUserSatisfaction,
} from '@system/controllers/systemsController';

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
  'DB_NAME',
  'MONGO_URI',
  'REDIS_URI',
  'SESSION_SECRET',
  'INSTANCE_NAME',
  'NODE_ENV',
  'BASE_URL',
  'BASE_REDIRECT_URL',
  'PAGINATION_LIMIT',
  'ORGANISATION_ID',
  'CORS',
  'SLACK_SECRET',
  'SLACK_CLIENT_ID',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',
  'SIGNING_SECRET',
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
