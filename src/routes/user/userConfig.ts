import { Router } from 'express';
import { validateSysAdminPerms } from '@middleware/validatePermissions';
import { secured as validateSession } from '@middleware/validateSession';
import { updateUserPermissions } from './controllers/updateUserPermissions';
import { validate } from './controllers/userController';
import { getUser } from './controllers/getUser';

const router = Router();

router.patch('/update', validateSession, validateSysAdminPerms, validate('update'), updateUserPermissions);
router.get('/', validateSession, getUser);

export default router;
