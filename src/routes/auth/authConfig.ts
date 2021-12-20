import googleCallbackRouter from './controllers/callbacks/googleCallback';
import slackCallbackRouter from './controllers/callbacks/slackCallback';
import loginRouter from './controllers/login';
import logoutRouter from './controllers/logout';
import { Router } from 'express';
import { generateCdnToken } from './controllers/generateCdnToken';
import { secured as validateSession } from '../../middleware/validateSession';
import { validate } from './controllers/authController';

const authRouter: Router = Router();

authRouter.post('/content-token', validateSession, validate('generateCdnToken'), generateCdnToken);

export { googleCallbackRouter, slackCallbackRouter, loginRouter, logoutRouter, authRouter };
