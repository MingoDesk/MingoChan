import { Router } from 'express';
import googleCallbackRouter from './controllers/callbacks/googleCallback';
import slackCallbackRouter from './controllers/callbacks/slackCallback';
import loginRouter from './controllers/login';
import logoutRouter from './controllers/logout';

const router = Router();

router.use(googleCallbackRouter, slackCallbackRouter, loginRouter, logoutRouter);

export default router;
