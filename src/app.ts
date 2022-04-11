import express, { Application } from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import cors from 'cors';
import { Request, Response } from 'express-serve-static-core';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { setupDB } from '@database/db';
import { checkEnvVars } from '@util/check-env-vars';
import { logger } from './util/logger';
import { handle404 } from '@middleware/handle404';
import { setupRoutes } from '@routes/router';
import { v4 as uuid } from 'uuid';

const init = async (app: Application): Promise<void> => {
  // Check that all env variables are set
  checkEnvVars();

  // Application configuration and init

  app.use(pinoHttp({
    name: process.env.DB_NAME,
    level: process.env.LOG_LEVEL,
    genReqId: () => uuid()
  }));
  app.use(cookieParser());
  app.use(express.json({ limit: '100kb', strict: true, type: 'application/json' }));
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS.split('|'),
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );

  setupRoutes(app);

  app.use((req: Request, res: Response) => {
    logger.warn('About to handle 404');
    handle404(req, res);
  });

  await setupDB({ uri: process.env.MONGO_URI, name: process.env.DB_NAME });

  process.on('uncaughtException', error => {
    logger.error(error);
  });

  app.listen(process.env.PORT, () => logger.info(`Listening on PORT:${process.env.PORT}`));
};

export { init };
