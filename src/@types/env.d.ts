declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		DB_NAME: string;
		MONGO_URI: string;
		REDIS_URI: string;
		SESSION_SECRET: string;
		INSTANCE_NAME: string;
		NODE_ENV: string;
		CLIENT_ID: string;
		SECRET: string;
		ISSUER_BASEURL: string;
		SESSION_LIFETIME: string;
		BASE_REDIRECT_URL: string;
		PAGINATION_LIMIT: string;
		AUTH0_AUDIENCE: string;
		AUTH0_DOMAIN: string;
		ORGANISATIONID: string;
	}
}
