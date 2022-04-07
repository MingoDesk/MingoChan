import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import cors from 'cors';
import { Request, Response } from 'express-serve-static-core';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { setupDB } from '@database/db';
import { checkEnvVars } from '@util/checkEnvVars';
import { handleError } from '@errors/handleError';
import { logger } from './util/logger';
import { MingoChanError } from '@errors/MingoChanError';
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
    redact: ['req.headers.authorization'],
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

  app.use((err: MingoChanError, req: Request, res: Response) => {
    handleError(err, req, res);
  });

  app.use((err: MingoChanError, req: Request, res: Response, next: NextFunction) => handle404(req, res, next, err));

  process.on('uncaughtException', error => {
    logger.error(error);
  });


  await setupDB({ uri: process.env.MONGO_URI, name: process.env.DB_NAME });

  app.listen(process.env.PORT, () => logger.info(`Listening on PORT:${process.env.PORT}`));
};

export { init };
