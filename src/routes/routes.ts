import { Application } from 'express';
import callbackRouter from './auth/controllers/callback';
import loginRouter from './auth/controllers/login';
import logoutRouter from './auth/controllers/logout';
import ticketsRouter from './tickets/ticketConfig';
import systemRouter from './system/systemConfig';
import organisationRouter from './organisation/organisationConfig';
import userRouter from './user/userConfig';

const setupRoutes = (app: Application): void => {
	app.use('/api', loginRouter, callbackRouter, logoutRouter);
	app.use('/api/tickets', ticketsRouter);
	app.use('/api/system', systemRouter);
	app.use('/api/organisation', organisationRouter);
	app.use('/api/user', userRouter);
};

export { setupRoutes };
