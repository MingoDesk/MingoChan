import { Router } from 'express';
import { exportTicket } from './controllers/exportTicket';
import { secured as validateSession } from '../../../middleware/validateSession';
import { validateSysAdminPerms } from '../../../middleware/validatePermissions';

const router = Router();

router.get('/', validateSession, validateSysAdminPerms, exportTicket);

export default router;
