import { ISystemSettings, Themes, PrefDataType, AvgUserSatisfaction } from '@system/controllers/systemsController';

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
	'CLIENT_ID',
	'BASEURL',
	'SECRET',
	'ISSUER_BASEURL',
	'BASE_REDIRECT_URL',
	'PAGINATION_LIMIT',
	'AUTH0_AUDIENCE',
	'AUTH0_DOMAIN',
	'ORGANISATIONID',
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
