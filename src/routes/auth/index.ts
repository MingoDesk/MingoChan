import { Router } from 'express';
import { validate } from './auth-validators';
import { signUpBasicAuth } from './signUpBasicAuth';

const router = Router();

router.post('/signup/basic', validate('signUpWithBasicAuth'), signUpBasicAuth);

export default router;
