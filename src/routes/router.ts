import { Application } from 'express';
import AuthRouter from '@auth/index';

export const setupRoutes = (app: Application): void => {
  app.use('/api/auth', AuthRouter);
};
