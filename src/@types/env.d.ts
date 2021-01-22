declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    DB_NAME: string;
    SESSION_SECRET: string;
    NODE_ENV: string;
    SESSION_LIFETIME: string;
    SID: string;
    REDIS_URI: string;
  }
}
