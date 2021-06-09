import { Router } from 'express';
import { updateSystemSettingsRoute } from './controllers/updateSystemSettings';
import { getSystemSettings } from './controllers/getSystemSettings';
import { validate } from './controllers/systemsController';
import { secured as validateSession } from '../../middleware/validateSession';
import { validateSysAdminPerms } from '../../middleware/validatePermissions';

const router = Router();

// eslint-disable-next-line
router.get('/', getSystemSettings);
// @ts-ignore
router.patch('/update', validateSession, validateSysAdminPerms, validate('update'), updateSystemSettingsRoute);

export default router;
