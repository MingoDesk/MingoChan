import { Router } from 'express';
import { exportFile } from './controllers/exportController';
import { secured as validateSession } from '../../middleware/validateSession';

const router = Router();

router.get('/', validateSession, exportFile);

export default router;
