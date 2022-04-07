import pino from 'pino';

export const logger = pino({
  name: process.env.DB_NAME,
  level: process.env.LOG_LEVEL,
  redact: ['req.headers.authorization'],
});
