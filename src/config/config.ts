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

const ENV_FILTER: string[] = [
  'PORT',
  'DB_NAME',
  'MONGO_URI',
  'REDIS_URI',
  'JWT_EXP',
  'JWT_SECRET',
  'SESSION_SECRET',
  'NODE_ENV',
  'BASE_URL',
  'BASE_REDIRECT_URL',
  'PAGINATION_LIMIT',
  'ORGANISATION_ID',
  'CORS',
  'SLACK_SECRET',
  'SLACK_CLIENT_ID',
  'SLACK_AUTHORIZE_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',
  'SIGNING_SECRET',
  'LOG_LEVEL'
];


export { datbaseCollections, ENV_FILTER };
