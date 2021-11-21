import { Application } from 'express';
import {
	googleCallbackRouter,
	slackCallbackRouter,
	loginRouter,
	logoutRouter,
	authRouter,
} from './auth/authConfig';
import ticketsRouter from './tickets/ticketConfig';
import systemRouter from './system/systemConfig';
import organisationRouter from './organisation/organisationConfig';
import userRouter from './user/userConfig';

const setupRoutes = (app: Application): void => {
	app.use(
		'/api/auth',
		googleCallbackRouter,
		slackCallbackRouter,
		loginRouter,
		logoutRouter,
		authRouter,
	);
	app.use('/api/tickets', ticketsRouter);
	app.use('/api/system', systemRouter);
	app.use('/api/organisation', organisationRouter);
	app.use('/api/user', userRouter);
};

export { setupRoutes };
