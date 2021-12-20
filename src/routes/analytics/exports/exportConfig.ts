import { Router } from 'express';
import { secured as validateSession } from '@middleware/validateSession';
import { validateSysAdminPerms } from '@middleware/validatePermissions';
import { exportTicket } from './controllers/exportTicket';

const router = Router();

router.get('/', validateSession, validateSysAdminPerms, exportTicket);

export default router;
