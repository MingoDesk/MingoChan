import express, { Application } from 'express';
import dotenv from 'dotenv';
import { init } from './app';
import { logger } from './util/logger';

dotenv.config();

const app: Application = express();

const start = async () => {
  await init(app);
};

// eslint-disable-next-line no-console
start().catch(err => {
  logger.error(err);
});
