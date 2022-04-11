import { Router } from 'express';
import { validate } from './auth-validators';
import { basicAuthLogin } from './login/basic-auth';
import { signUpBasicAuth } from './register/basic-auth';


const router = Router();

// Basic login

router.post('/signup/basic', validate('signUpWithBasicAuth'), signUpBasicAuth);
router.post('/login/basic', validate('loginWithBasicAuth'), basicAuthLogin);


export default router;
