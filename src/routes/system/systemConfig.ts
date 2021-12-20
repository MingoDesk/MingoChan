import { Router } from 'express';
import { secured as validateSession } from '@middleware/validateSession';
import { validateSysAdminPerms } from '@middleware/validatePermissions';
import { updateSystemSettingsRoute } from './controllers/updateSystemSettings';
import { getSystemSettings } from './controllers/getSystemSettings';
import { validate } from './controllers/systemsController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', getSystemSettings);
router.patch('/update', validateSession, validateSysAdminPerms, validate('update'), updateSystemSettingsRoute);

export default router;
