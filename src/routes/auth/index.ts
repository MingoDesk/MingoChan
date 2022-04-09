import { Router } from 'express';
import { validate } from './auth-validators';
import { signUpBasicAuth } from './register/basic-auth';


const router = Router();

router.post('/signup/basic', validate('signUpWithBasicAuth'), signUpBasicAuth);

export default router;
