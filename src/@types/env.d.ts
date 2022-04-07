// This declaration file simply implies that we expect these node-env's to be ready for runtime.
// Make sure all the below env vars are set in a .env in the MingoWhale project.
declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		DB_NAME: string;
		MONGO_URI: string;
		REDIS_URI: string;
		SESSION_SECRET: string;
		JWT_EXP: string; // Eg: 60, "2 days", "10h", "7d"
		JWT_SECRET: string; // Should be long
		NODE_ENV: string; // production or anything else
		GOOGLE_CLIENT_ID: string;
		GOOGLE_SECRET: string;
		SLACK_CLIENT_ID: string;
		SLACK_SECRET: string;
		OFFICE365_CLIENT_ID: string;
		OFFICE365_SECRET: string;
		SESSION_LIFETIME: string;
		BASE_REDIRECT_URL: string;
		PAGINATION_LIMIT: string;
		ORGANISATION_ID: string;
		CORS: string; // IP's and domains are split by | (pipes)
		BASE_URL: string;
		SIGNING_SECRET: string;
		LOG_LEVEL: string;
	}
}
