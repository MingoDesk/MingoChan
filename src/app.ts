import express, { Application } from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { setupDB } from '@database/db';
import { checkEnvVars } from '@util/checkEnvVars';
import { setupRoutes } from '@routes/routes';
import initializeAuth from '@lib/setup.passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const init = async (app: Application): Promise<void> => {
  // Check that all env variables are set
  checkEnvVars();

  // Application configuration and init
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

  await setupDB({ uri: process.env.MONGO_URI, name: process.env.DB_NAME });
  initializeAuth(app);
  setupRoutes(app);

  // eslint-disable-next-line no-console
  app.listen(process.env.PORT, () => console.info(`Listening on PORT:${process.env.PORT}`));
};

export { init };
