import { Router } from 'express';
import { exportTicket } from './controllers/exportTicket';
import { secured as validateSession } from '../../middleware/validateSession';

const router = Router();

router.get('/', validateSession, exportTicket);

export default router;
