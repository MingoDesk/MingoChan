import { updateUserPermissions } from './controllers/updateUserPermissions';
import { Router } from 'express';
import { validateSysAdminPerms } from '@middleware/validatePermissions';
import { secured as validateSession } from '@middleware/validateSession';
import { validate } from './controllers/userController';

const router = Router();

router.patch('/update', validateSession, validateSysAdminPerms, validate('update'), updateUserPermissions);

export default router;
