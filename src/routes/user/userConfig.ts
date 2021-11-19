import { Router } from 'express';
import { validateSysAdminPerms } from '@middleware/validatePermissions';
import { secured as validateSession } from '@middleware/validateSession';
import { updateUserPermissions } from './controllers/updateUserPermissions';
import { validate } from './controllers/userController';
import { getUser } from './controllers/getUser';
import { createLocalUser } from './controllers/createLocalUser';

const router = Router();

router.patch(
	'/update',
	validateSession,
	validateSysAdminPerms,
	validate('update'),
	updateUserPermissions,
);
router.get('/', validateSession, getUser);
router.post('/new', validate('create-local'), createLocalUser);

export default router;
